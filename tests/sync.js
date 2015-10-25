var bbone = require('../dist/bbone')
var sync = bbone.sync

describe('sync', function() {
  var req = sync.get('/');

  it(`should have 'get','post','put' and 'delete' methods`, function() {
    sync.should.have.property('get').and.be.Function
    sync.should.have.property('post').and.be.Function
    sync.should.have.property('put').and.be.Function
    sync.should.have.property('delete').and.be.Function
  })

  it('should be instance of Vent, and sync.Sync', function() {
    req.should.be.an.instanceof(bbone.Vent)
                .and.instanceof(sync.Sync);
  })
})


describe('sync:send', function() {
  var data = {a:1,b:2};
  var str = JSON.stringify(data)
  ;[{
    prop: 'url',
    method: 'get',
    type: 'application/x-www-form-urlencoded',
    expect: '/?a=1&b=2'
  },{
    prop: 'data',
    method: 'post',
    type: 'application/json',
    expect: str
  },{
    prop: 'data',
    method: 'put',
    type: 'application/json',
    expect: str
  },{
    prop: 'data',
    method: 'delete',
    type: 'application/json',
    expect: str
  }].forEach(function(o) {

    var req = sync[o.method]('/').send(data)

    it(`should serialize "${o.method}" data`, function() {
      req.should.have.property(o.prop).and.be.equal(o.expect)
    })

    it(`should set content-type header to "${o.type}"`, function() {
      req.type().should.be.equal(o.type);
    })

  })
})

describe('sync: serialize', function() {
  var url = '/api',
      query = '/api?a=1&b=2',
      data = {a:1,b:2},
      req = sync.get(url);

  it('should not throw being called with arguments other than object', function(done) {
    try {
      req.serialize();
    } catch(e) {
      return done(e);
    }
    done();
  })

  it('should return serialized data', function() {
    req.serialize(data).should.be.exactly(query);
  })

  req.send(data)

  it('should append serialized data to url', function() {
    req.url.should.be.exactly(query);
  })

  it('should  set type to application/x-www-form-urlencoded', function() {
    req.type().should.be.exactly('application/x-www-form-urlencoded');
  })
})
