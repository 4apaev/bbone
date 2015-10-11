var Egg = require('../dist/bbone').Egg
var Vent = require('../dist/bbone').Vent

describe('Egg', function() {
  var egg = new Egg
  it('should be instance of Egg and Vent', function() { egg.should.be.an.instanceof(Vent).and.instanceof(Vent) })
})

describe('Egg:set', function() {
  var egg = new Egg;
  it('should set key val', function() { egg.set('a', 1).get('a').should.be.equal(1) })
  it('should set object', function() { egg.set({b: 2}).get('b').should.be.equal(2) })
})

describe('Egg:events', function() {
  var egg = new Egg, x = 'a', y = 1, called = false;
  function done(cb) {
    return function(a,b) {
        arguments.length.should.be.equal(2)
        a.should.be.equal(x)
        b.should.be.equal(y)
        cb()
      }}

  it('should emit `create` event', function(cb) { egg.once('create', done(cb)).set(x, y) });
  it('should emit `change` event', function(cb) { egg.once('change', done(cb)).set(x, (y=2)) });

  it('should not emit `change` event', function() {
    egg.once('change', function() { called = true }).set(x, y);
    called.should.be.false;
  })
  it('should emit `delete` event', function(cb) { egg.once('delete', done(cb)).unset(x); })

})
