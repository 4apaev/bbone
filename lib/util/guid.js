(function(cnt, MIN, MAX, chars, exports) {
  var lng = chars.length;

  function guid(n, prefix) {
    for (var i = 0; i < n; i++)
      prefix += chars[(0|Math.random()*lng)];
    return prefix;
  }

  function int(n) {
    return n > MAX ? MAX : n < MIN ? MIN : n;
  }

  exports.guid = function(n, prx) {
    return guid(int(n|0), (prefix||'uid') + '-' + (cnt++))
  }

}.call(this,
  0,0,64,
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  this.util||(this.util={})))