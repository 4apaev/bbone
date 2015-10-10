var assert = require('assert');
var should = require('should');
var bbone = require('../dist/bbone');
var Vent = bbone.Vent;
var log = console.log.bind(console);
var noop = assert.fail.bind(assert, 1, 0, 'must not be invoked')
var yep = function(cb) { cb() }

function run(method, x) {
  var args = [].slice.call(arguments, 2)
  return function() {
    try { x[method].apply(x, args) }
    catch(e) { assert.fail(0, e, e.toString()) }}}

function check(name){
    var self = this
    it(`should have "${name}" method`,function(){ self.should.have.property(name).which.is.a.Function })
  }

describe('constractor', function() {
  ['use','extend'].forEach(check, Vent);
})

describe('instance', function() {
  var ev = new Vent;
  ['on','off','once','emit'].forEach(check, ev);
})

describe('on', function() {
  it('should not throw when called with a string and a function', run('on', new Vent(), 'ping', log))
  it('should not throw when called with a string, a function and an object', run('on', new Vent(), 'ping', log, {}))
})

describe('off', function() {
  var ev = new Vent()
  ev.on('ping', log);
  it('should not throw when called with not registered event',    run('off', ev, 'kong'))
  it('should not throw when called with not registered function', run('off', ev, 'ping', noop))
  it('should not throw when called with a string and a function', run('off', ev, 'ping', log))
})

describe('emit', function() {
  var ev = new Vent()
  beforeEach(function(){ ev.off() })

  it('should pass additional arguments', function(done) {
    ev.on('ping', yep).emit('ping', done)
  })

  it('should invoke in context', function() {
    var cx = {}
    ev.on('ping', function() { assert.equal(cx, this) }, cx)
      .emit('ping')
  })

  it('should invoke none', function() {
    ev.on('ping', noop)
      .on('ping', noop)
      .on('pong', noop)
      .on('pong', noop)
    .off()
      .emit('ping')
      .emit('pong')
  })

  it('should invoke all but specified callback', function(done) {
    ev.on('ping', yep)
      .on('ping', noop)
    .off('ping', noop)
      .emit('ping', done)
  })

  it('should invoke all but specified event', function(done) {
    ev.on('pong', yep)
      .on('ping', noop)
      .on('ping', noop)
    .off('ping')
      .emit('ping')
      .emit('pong', done)
  })
})

describe('once', function() {
  var ev = new Vent()
  it('should invoke once', function() {
    ev.once('ping', function(f) { f() })
      .emit('ping', log)
      .emit('ping', noop)
  })

  it('should invoke in context', function() {
    var cx = {}
    ev.once('ping', function() { assert.equal(cx, this) }, cx)
      .emit('ping')
  })
})

describe('extend', function() {

  var Fn=Vent.extend({wrap:function(x){return `@@@ ${x} @@@`;}})
  var child = new Fn;
  ['on','off','once','emit','wrap'].forEach(check, child);

  it('should return wrapped value', function() {
    child.wrap('X').should.be.equal('@@@ X @@@');
  })
})

describe('use', function() {
  var child = new Vent;
  Vent.use('sum', function(a,b) {
    return a+b
  });

  ['sum'].forEach(check, child);

  it('should return 5 when invoked with 2 and 3', function() {
    child.sum(2,3).should.be.equal(5);
  })

})