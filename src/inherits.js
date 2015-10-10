var defines = require('./defines');
var own = require('../lib/util/own');

module.exports = inherits;

function inherits(A, B) {
    B||(B=Base);
    A.prototype = Object.create(B.prototype, {constructor:{value:A,enumerable:false,writable:true,configurable:true}});
    A.super = B;
    A.use = defines.bind(A, A.prototype);
    A.extend = extend;
    return A;
  }

function extend(trg) {
    var Super = this;
    var Ctor = inherits(own(trg, 'constructor') ? trg.constructor : function Ch(){
        Super.apply(this, arguments);
      }, this);

    for(var k, v, i = 0; i < arguments.length; i++){
        for(k in (v=arguments[i]))
          'constructor' != k && own(v,k) && Ctor.use(k, v[k]);
      }
    return Ctor;
  }

function Base(){}
Base.prototype.toString = function() {
  return '[object '+this.constructor.name+']'
}