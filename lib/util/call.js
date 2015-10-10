module.exports = function call(method) {
  return Function.prototype.call.bind(method);
}