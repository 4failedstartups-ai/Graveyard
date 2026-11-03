/**
 * Buy Me a Beer backend (Google Apps Script) for The Startup Graveyard.
 * Verifies every payment with Razorpay's API BEFORE it counts toward the leaderboard.
 *
 * SETUP (details in SUPPORT-SETUP.md)
 *  1. In your Google Sheet: Extensions > Apps Script. Paste this file.
 *  2. Project Settings > Script properties: add RZP_KEY_ID and RZP_KEY_SECRET (from the Razorpay dashboard).
 *  3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Copy the /exec URL.
 *  4. Put that URL in the Settings tab of your site sheet:  support_api_url
 */
var TIERS = [10, 50, 100, 500, 5000];          // must match the site
var SHEET = 'Supporters';
var HEAD = ['Time', 'Payment ID', 'Order ID', 'Name', 'Amount (INR)', 'Status'];

function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function prop_(k) { return PropertiesService.getScriptProperties().getProperty(k); }
function auth_() { return 'Basic ' + Utilities.base64Encode(prop_('RZP_KEY_ID') + ':' + prop_('RZP_KEY_SECRET')); }
function sheet_() {
  var ss = SpreadsheetApp.getActive(), sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}
function cleanName_(n) {
  n = String(n || '').replace(/[^\p{L}\p{N} ._@-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 20);
  return n.length >= 2 ? n : 'Anonymous Drinker';
}
function rzp_(method, path, body) {
  var o = { method: method, headers: { Authorization: auth_() }, muteHttpExceptions: true, contentType: 'application/json' };
  if (body) o.payload = JSON.stringify(body);
  var r = UrlFetchApp.fetch('https://api.razorpay.com/v1' + path, o);
  var j = JSON.parse(r.getContentText() || '{}');
  if (r.getResponseCode() >= 300) throw new Error((j.error && j.error.description) || 'Razorpay error ' + r.getResponseCode());
  return j;
}

function top5_() {
  var cache = CacheService.getScriptCache(), hit = cache.get('top5');
  if (hit) return JSON.parse(hit);
  var rows = sheet_().getDataRange().getValues().slice(1), agg = {};
  rows.forEach(function (r) {
    if (r[5] !== 'paid') return;
    var name = String(r[3]), k = name.toLowerCase();
    var a = agg[k] || (agg[k] = { name: name, total: 0, count: 0 });
    a.total += Number(r[4]) || 0; a.count++;
  });
  var top = Object.keys(agg).map(function (k) { return agg[k]; })
    .sort(function (x, y) { return y.total - x.total; }).slice(0, 5);
  cache.put('top5', JSON.stringify(top), 20);
  return top;
}

function doGet() { try { return json_({ ok: true, top: top5_() }); } catch (e) { return json_({ ok: false, error: String(e) }); } }

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.action === 'order') return json_(createOrder_(d));
    if (d.action === 'verify') return json_(verify_(d));
    return json_({ ok: false, error: 'bad action' });
  } catch (err) { return json_({ ok: false, error: String(err.message || err) }); }
}

function createOrder_(d) {
  var amt = Number(d.amount);
  if (TIERS.indexOf(amt) < 0) throw new Error('invalid amount');
  var name = cleanName_(d.name);
  var o = rzp_('post', '/orders', { amount: amt * 100, currency: 'INR', receipt: 'gy_' + Date.now(), notes: { name: name } });
  return { ok: true, orderId: o.id, amount: o.amount, keyId: prop_('RZP_KEY_ID') };
}

function hex_(bytes) { return bytes.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join(''); }

function verify_(d) {
  var orderId = String(d.orderId || ''), payId = String(d.paymentId || ''), sig = String(d.signature || '');
  var expect = hex_(Utilities.computeHmacSha256Signature(orderId + '|' + payId, prop_('RZP_KEY_SECRET')));
  if (expect !== sig.toLowerCase()) throw new Error('bad signature');
  // Never trust the browser: confirm with Razorpay that this payment is real, for this order, and captured.
  var p = rzp_('get', '/payments/' + encodeURIComponent(payId));
  if (p.order_id !== orderId) throw new Error('order mismatch');
  if (p.status === 'authorized') p = rzp_('post', '/payments/' + encodeURIComponent(payId) + '/capture', { amount: p.amount, currency: 'INR' });
  if (p.status !== 'captured') throw new Error('payment not captured');
  var o = rzp_('get', '/orders/' + encodeURIComponent(orderId));
  var amt = o.amount / 100;
  if (TIERS.indexOf(amt) < 0 || o.amount !== p.amount) throw new Error('amount mismatch');
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var sh = sheet_(), ids = sh.getRange(2, 2, Math.max(sh.getLastRow() - 1, 1), 1).getValues().map(function (r) { return r[0]; });
    if (ids.indexOf(payId) < 0) sh.appendRow([new Date(), payId, orderId, cleanName_(o.notes && o.notes.name), amt, 'paid']);
    CacheService.getScriptCache().remove('top5');
  } finally { lock.releaseLock(); }
  return { ok: true, top: top5_() };
}
