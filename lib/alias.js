module.exports = alias
function alias(ctx, src, name, nikname) {
  var desc = Object.getOwnPropertyDescriptor(src, name);
  desc && Object.defineProperty(ctx, nikname||name, desc);
}