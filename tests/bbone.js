var assert = require('assert');
var should = require('should');
var bbone = require('../dist/bbone');
var Vent = bbone.Vent;
var log = console.log.bind(console);

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


describe('on,off,emit', function() {
  var ev = new Vent
  var ctx = {name:'ctx'}
  var done = function(cb) {
    this.should.be.equal(ctx)
    cb()
  }

  var fail = function(cb) { cb(new Error('must not be invoked')) }

  it('should remove all events', function(cb) {
    ev.on('a', fail)
      .on('b', fail)
      .on('c', fail)

      .off()
      .emit('a')
      .emit('b')
      .emit('c')

      .on('fin', done, ctx)
      .emit('fin', cb);
  })

  it('should remove all `b` callbacks', function(cb) {
    ev.on('b', fail)
      .on('b', fail)
      .on('b', fail)

      .off('b')
      .emit('b')
      .emit('fin', cb);
  })

  it('should remove one callback', function(cb) {
    ev.on('fin', fail)
      .on('fin', fail)
      .on('fin', fail)

      .off('fin', fail)
      .emit('fin', cb);
  })
})

describe('once', function() {
  it('should invoke once', function() {

    var ev = new Vent
    var ctx = {i:0}

    ev.once('a', function() { this.i+=1 }, ctx)
      .emit('a')
      .emit('a');

    ctx.i.should.be.exactly(1)
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
  Vent.use('sum', function(a,b) { return a+b });

  ['sum'].forEach(check, child);

  it('should return 5 when invoked with 2 and 3', function() {
    child.sum(2,3).should.be.equal(5);
  })
})

// function run(method, x) {
//   var args = [].slice.call(arguments, 2)
//   return function() {
//     try { x[method].apply(x, args) }
//     catch(e) { assert.fail(0, e, e.toString()) }}}

// describe('on', function() {
//   it('should not throw when called with a string and a function', run('on', new Vent(), 'ping', log))
//   it('should not throw when called with a string, a function and an object', run('on', new Vent(), 'ping', log, {}))
// })

// describe('off', function() {
//   var ev = new Vent()
//   ev.on('fin', log);
//   it('should not throw when called with not registered event',    run('off', ev, 'a'))
//   it('should not throw when called with not registered function', run('off', ev, 'ping', noop))
//   it('should not throw when called with string and function',     run('off', ev, 'ping', log))
// })
