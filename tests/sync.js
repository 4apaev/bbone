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

  it('should be instance of Vent, Egg and sync.Sync', function() {
    req.should.be.an.instanceof(bbone.Vent)
                .and.instanceof(bbone.Egg)
                .and.instanceof(sync.Sync);
  })



})