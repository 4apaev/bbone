var inherits = require('./inherits')
var defines = require('./defines')
var Base = require('./base')
var slice = [].slice

module.exports = Vent;
function Vent() {
    var uid = Math.random().toString(36).slice(2);
    Vent.store[uid] = Object.create(null);
    defines(this, '000:value:uid', uid);
    defines(this, '100:get:vents', function(){ return Vent.store[uid] });
    defines(this, '100:set:vents', function(x){ Vent.store[uid] = x; });
  }

Vent.store=Object.create(null);
inherits(Vent, Base);

Vent.use('on', function(type, fx, ctx) {
    if(arguments.length < 2)  //||''+type!=type
      this.fail('missing arguments',1);
    return (this.vents[type]||(this.vents[type]=[])).push({ fx: fx, ctx: ctx }), this;
  })

Vent.use('off', function(type, fx) {
    if (type) {
        if (type in this.vents) {
          if (fx) {
            var x, i = -1, arr = this.vents[type];
            while (x = arr[++i]) fx === x.fx && (arr.splice(i, 1), i--);
          } else { delete this.vents[type]; }
        }
      } else { this.vents = Object.create(null); }
    return this;
  })

Vent.use('emit', function(type) {
    var arr = this.vents[type]
    if(arr) {
        var x, i = -1, argv = slice.call(arguments, 1);
        while(x=arr[++i])
          x.fx.apply(x.ctx, argv);
      }
    return this;
  })

Vent.use('once', function(type, fx, ctx) {
    this.on(type, function tmp() {
      fx.apply(ctx, arguments)
      this.off(type, tmp);
    }, this);
    return this;
  });