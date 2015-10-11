var own = require('./util/own')
var use = require('./use')

module.exports = delegate
function delegate(fn, ctx, src, methods) {
  (methods||Object.getOwnPropertyNames(src)).forEach(function(name) {
    own(src, name) && fn(ctx, src, name);
  });
  return ctx;
}