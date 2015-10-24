var Vent = require('../dist/bbone').Vent
var List = require('../dist/bbone').List


describe('List', function() {
  it('should be instance of and Vent', function() {
    var ls = new List
    ls.should.be.an.instanceof(Vent)
  })

  it('should accept arguments when created', function() {
    var ls = new List(1,2,3)
    ls.should.have.property('length', 3)
  })
  it('should accept array when created', function() {
    var ls = new List([1,2,3])
    ls.should.have.property('length', 3)
  })
})

describe('List:add', function() {
  ['push','unshift'].forEach(function(method) {
    var ls = new List
    it(`should ${method} value and self return`, function() {
      ls[method](1).should.be.equal(ls)
      ls.should.have.property('length', 1)
    })

    it(`should emit "add" event on ${method}`, function(done) {
      ls.once('add', function(x){
        x.should.be.equal(2)
        ls.should.have.property('length', 2)
        done()
      })[method](2);
    })

    it(`should ${method} multiple values`, function() {
      ls[method](3,4,5).should.have.property('length', 5)
    })
  })
})

describe('List:remove', function() {

  ['pop','shift'].forEach(function(method) {
    var ls = new List(1,2,3,4,5)
    it(`should ${method} and return last element`, function() {
      ls[method]().should.be.equal('pop'==method ? 5 : 1)
      ls.should.have.property('length', 4)
    })

    it(`should emit "remove" event on ${method}`, function(done) {
      ls.once('remove', function(x){

        x.should.be.equal('pop'==method ? 4 : 2)
        ls.should.have.property('length', 3)
        done()
      })[method]();
    })
  })

  it(`should splice one element`, function() {
    var ls = new List(1,2,3,4,5)
    var res = ls.splice(1,1)
    res.should.have.property('length', 1)
    res.should.have.property(0, 2)

    ls.should.have.property('length', 4)
    ls.should.have.property(1, 3)
  })

  it(`should splice multiple elements and emit "remove" event`, function() {
    var ls = new List(1,2,3,4,5)

    ls.once('remove', function(res){
      res.should.have.property('length', 2)
      res.should.have.property(0, 2)
      res.should.have.property(1, 3)
    })

    ls.splice(1,2)
    ls.should.have.property('length', 3)
    ls.should.have.property(1, 4)
  })

  it(`should remove matched elements`, function() {
    var ls = new List(1,2,3,4,5)
    ls.remove(function(x) {
      return x > 2;
    })
    ls.should.have.property('length', 2)
    ls.should.have.property(0, 1)
    ls.should.have.property(1, 2)
  })

  it(`should remove matched objects`, function() {
    var ls = new List({id:1,type:'a'}, {id:2,type:'b'}, {id:2,type:'a'})
    ls.remove({type:'a'})

    ls.should.have.property('length', 1)
    var x = ls[0]
    x.should.have.property('type', 'b')
    x.should.have.property('id', 2)

  })
})

// describe('List', function() {
//   it('should be instance of and Vent', function() {

//     var res;
//     var ls = new List('one','two','three','four')

//     ls.eachAsync(function(x, i, next) {
//       setTimeout(function() {
//         next();
//       }, 8);
//     }, function() {

//     });




//   })
// })








// join
// concat
// reverse
// slice
// sort
// map
// some
// every
// forEach
// indexOf
// lastIndexOf
// reduce
// reduceRight
// keys
// entries

// filter
// pop
// shift
// splice
// unshift
// push
// remove
// invoke
// pluck
// at
// has
// eachAsync