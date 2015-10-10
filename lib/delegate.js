var own = require('./util/own')
var use = require('./use')

module.exports = delegate
function delegate(fn, ctx, src, methods) {
  // if('function'!=typeof fn)
  //   return delegate(use, fn, ctx, src||Object.getOwnPropertyNames(ctx));

  (methods||Object.getOwnPropertyNames(src)).forEach(function(name) {
    own(src, name) && fn(ctx, src, name);
  });
  return ctx;
}