var Vent = require('../dist/bbone').Vent

describe('on,off,emit', function() {
  var ev = new Vent
  var ctx = {name:'ctx'}
  var fail = function(cb) { cb(new Error('must not be invoked')) }
  var done = function(cb) {
    this.should.be.equal(ctx)
    cb()
  }

  it('should add all events', function() {
    ev.on('a', fail)
      .on('b', fail)
      .on('c', fail);
    ev.should.have.ownProperty('vents')

    ev.vents.a.should.be.instanceof(Array).and.have.lengthOf(1)
    ev.vents.b.should.be.instanceof(Array).and.have.lengthOf(1)
    ev.vents.c.should.be.instanceof(Array).and.have.lengthOf(1)
  })

  it('should remove all events', function(cb) {
    ev.off()
      .emit('a', cb)
      .emit('b', cb)
      .emit('c', cb);

    ev.should.have.ownProperty('vents').and.be.empty;
    cb()
  })

  it('should remove all `b` callbacks', function(cb) {
    ev.on('fin', done, ctx)
      .on('b', fail)
      .on('b', fail)
      .on('b', fail);

    ev.vents.b.should.be.instanceof(Array).and.have.lengthOf(3);
    ev.off('b')
      .emit('b', cb)
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
