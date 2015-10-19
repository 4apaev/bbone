module.exports = Base

function Base(){}
Base.prototype.toString = function() {
  return `[object ${this.constructor.name}]`
}

Base.prototype.fail = function fail(msg, cast) {
  var err = new Error(`${this.constructor.name}: ${msg}`);
  if(cast) throw err;
  return err;
}

Base.prototype.delay = function(fn, tm) {
  return setTimeout(Function.bind.apply(fn, [].slice.call(arguments, 2)), tm)
}