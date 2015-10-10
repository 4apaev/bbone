var inherits = require('./inherits')
var defines = require('./defines')

module.exports = Vent;
function Vent() {
    var uid = Math.random().toString(36).slice(2);
    var vents = Vent.store[uid] = Object.create(null);
    defines(this, '000:value:uid', uid);
    defines(this, '100:get:vents', function(){ return vents });
    defines(this, '100:set:vents', function(x){ vents = x; });
  }

Vent.store=Object.create(null);
inherits(Vent);

Vent.use('on', function(type, fx, ctx) {
    return (this.vents[type]||(this.vents[type]=[])).push({ fx: fx, ctx: ctx}), this;
  })

Vent.use('off', function(type, fx) {
    switch(arguments.length) {
      case 0: this.vents = Object.create(null); break;
      case 1: delete this.vents[type]; break;
      default:
        var arr = this.vents[type]
        if(arr) {
            var x, i = -1;
            while(x=arr[++i])
              fx === x.fx && (arr.splice(i, 1), i--);
          }}
    return this;
  })

Vent.use('emit', function(type) {
    var arr = this.vents[type]
    if(arr) {
        var x, i = -1, argv = [].slice.call(arguments, 1);
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