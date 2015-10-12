function call(method) {
  return Function.prototype.call.bind(method);}

module.exports.call = call;
module.exports.tos = call({}.toString);
module.exports.own = call({}.hasOwnProperty);
module.exports.slice = call([].slice);
module.exports.index = call([].indexOf);