var own = {}.hasOwnProperty
var inherits = require('./inherits');
function extend(trg) {
    var Super = this;
    var Ctor = inherits(own.call(trg, 'constructor') ? trg.constructor : function Ch(){
        Super.apply(this, arguments);
      }, this);
    for(var k, v, i = 0; i < arguments.length; i++){
        for(k in (v=arguments[i]))
          'constructor' != k && own.call(v,k) && Ctor.use(k, v[k]);
      }
    return Ctor;
  }
