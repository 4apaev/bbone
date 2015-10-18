module.exports = alias
function alias(src, name, nikname) {
  var desc = Object.getOwnPropertyDescriptor(src, name);
  desc && Object.defineProperty(ctx, nikname||name, desc);
}