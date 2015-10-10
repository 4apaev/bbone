var own = require('./util/own')

module.exports = assign
function assign(x) {
      for(var k, o, i = 1, n = arguments.length; i < n; i++) {
        for(k in (o=arguments[i]))
          own(o,k) && (x[k] = o[k]); }
    return x;
  }