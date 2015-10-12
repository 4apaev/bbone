var own = {}.hasOwnProperty
module.exports = assign
function assign(x) {
      for(var k, o, i = 1, n = arguments.length; i < n; i++) {
        for(k in (o=arguments[i]))
          own.call(o,k) && (x[k] = o[k]); }
    return x;
  }