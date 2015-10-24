module.exports = serialize
function serialize(x) {
  var k, buf=[];
  for(k in x)
    buf.push('object'===typeof x[k]  ? serialize(x[k]) : `${encodeURIComponent(k)}=${encodeURIComponent(x[k])}`);
  return '?'+ buf.filter(Boolean).join('&')
}
