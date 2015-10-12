module.exports = Base

function Base(){}
Base.prototype.toString = function() {
  return '[object '+this.constructor.name+']'
}

Base.prototype.fail = function fail(msg, cast) {
  var err = new Error(msg);
  if(cast) throw err;
  return err;
}