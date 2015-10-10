var defines = require('./defines');
var Vent = require('./vent');

module.exports = Vent.extend({

  constructor:function Egg() {
    this.constructor.super.call(this);
    defines(this, 'shell', Object.create(null));
  },

  set: function(a, b){
    if('object'=== typeof a && a) {
      for(var k in a)
        this.set(k, a[k]);
    } else {
        var e;
        if(a in this.shell){
          this.shell[a] !=b && (e = 'change');
        } else {
          e = 'create';}
        if(e){
          this.shell[a]=b;
          this.emit(e, a, b); }}
    return this;
  },

  unset: function(x){
    if(this.has(x)) {
      var v = this.get(x);
      delete this.shell[x];
      this.emit('delete', x, v); }
    return this;
  },
  get: function(x){
      return this.shell[x];
    },
  has: function(x){
      return x in this.shell;
    }
})