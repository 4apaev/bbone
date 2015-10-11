var own = require('../lib/util/own');
var inherits = require('./inherits');
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
