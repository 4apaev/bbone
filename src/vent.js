var inherits = require('./base').inherits

function Vent() {
    this.vents=Object.create(null)
  }

inherits(Vent, inherits);

Vent.use('on', function(type, fx, ctx) {
    return (this.vents[type]||(this.vents[type]=[])).push({ fx: fx, ctx: ctx}), this;
  }).use('off', function(type, fx) {
    switch(arguments.length) {
      case 0: this.vents = {}; break;
      case 1: delete this.vents[type]; break;
      default:
        var arr = type in this.vents && this.vents[type]
        if(arr) {
            var x, i = -1;
            while(x=arr[++i])
              fx === x.fx && (arr.splice(i, 1), i--);
          }}
    return this;
  }).use('emit', function(type) {
    var arr = type in this.vents && this.vents[type]
    if(arr) {
        var x, i = -1, argv = [].slice.call(arguments, 1);
        while(x=arr[++i])
          x.fx.apply(x.ctx, argv);
      }
    return this;
  }).use('once', function(type, fx, ctx) {
    this.on(type, function() {
      fx.apply(ctx, arguments)
      this.off(type, arguments.callee);
    }, this);
    return this;
  })

module.exports = Vent;


    // def(this, '101:value:vents', Object.create(null));
// if(typeof exports=='object'&&typeof module!='undefined'){module.exports=Vent;}else if(typeof define=='function'){define([],function(){return Vent})}else{root.Vent=Vent;}
// browserify src/vent.js -t babelify --standalone Vent | uglifyjs -o dist/vent.js -b -i 2