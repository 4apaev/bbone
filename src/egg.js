var defines = require('./defines');
var alias = require('./alias');
var inherits = require('./inherits');
var Vent = require('./vent');

module.exports = Egg;
function Egg(prop) {
  Vent.call(this);
  defines(this, 'shell', Object.create(null));
  if(prop)
    alias(this, 'shell', prop)
}

inherits(Egg, Vent);

Egg.use('set', function(a, b){
    if('object'=== typeof a && a) {
      for(var k in a)
        this.set(k, a[k]);
    } else {
        var e;
        if(this.has(a)){
          this.get(a) !=b && (e = 'change');
        } else {
          e = 'create';}
        if(e){
          this.shell[a]=b;
          this.emit(e, a, b);
        }}
    return this;
  });

Egg.use('unset', function(x){
    if(this.has(x)) {
      var v = this.get(x);
      delete this.shell[x];
      this.emit('delete', x, v); }
    return this;
  });

Egg.use('get', function(x){ return this.shell[x] });
Egg.use('has', function(x){ return x in this.shell });