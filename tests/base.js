var Vent = require('../dist/bbone').Vent
var methods = ['on','off','once','emit']

function check(ctx, type){
    return function(k){
      it(`should have "${k}" property`,function(){ ctx.should.have.property(k).which.is.a[type] })
    }
  }

describe('constractor', function() {
  ['use'].forEach(check(Vent, 'Function'));
})

describe('instance', function() {
  var ev = new Vent
  ev.should.be.an.instanceof(Vent);
  methods.forEach(check(ev, 'Function'));
})

describe('use', function() {
  var child = new Vent;
  Vent.use('sum', function(a,b) { return a+b });
  methods.concat('sum').forEach(check(child, 'Function'))
  it('should return correct result', function() { child.sum(2,3).should.be.equal(5); })
})

// describe('extend', function() {
//   var Fn=Vent.extend({
//     up: function(x){
//       return x.toUpperCase()
//     }
//   })

//   var child = new Fn;

//   it('should be instance of Vent', function() {
//     child.should.be.an.instanceof(Vent)
//   })

//   it('should be instance of Fn', function() {
//     child.should.be.an.instanceof(Fn)
//   })

//   methods.concat('up').forEach(check(child, 'Function'))

//   it('should return correct result', function() {
//     child.up('x').should.be.equal('X');
//   })

// })

