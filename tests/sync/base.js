(function(sync, methods, types) {

  describe('sync: create', function() {
    it('should exist', function() {
      Should(sync).be.an.Function
    })

    methods.forEach(function(x) {
      it('should have `'+x+'` method', function() {
        Should(sync[x]).be.an.Function
      })
    })
  })

  describe('sync: type', function() {
    var x, req = sync.get('api');

    it('should not set content type, being called with arguments other than string', function() {
      req.type(0)
      Should(req.headers).not.have.property('content-type')
    })

    it('should return content type when called without arguments', function() {
      var t = 'application/pdf'
      Should(req.type(t).type()).be.equal(t)
    })

    for(var type in types) {
      it('should set content type `'+types[type]+'` when called with: ' + type, function() {
        Should(req.type(type).type()).be.equal(types[type])
      })
    }
  })

  describe('sync: serialize', function() {
    var url = 'api',
        query = 'api?a=1&b=2',
        data = {a:1,b:2},
        req = sync.get(url);

    it('should not throw being called with arguments other than object', function(done) {
      try {
        req.serialize();
      } catch(e) {
        done(e);
      }
      done();
    })

    it('should return serialized data', function() {
      Should(req.serialize(data)).be.exactly(query);
    })

    req.send(data)

    it('should append serialized data to url', function() {
      Should(req.url).be.exactly(query);
    })

    it('should  set type to ' + types.form, function() {
      Should(req.type()).be.exactly(types.form);
    })
  })

  describe('sync: send', function() {
    var req;
    methods.slice(1).forEach(function(method) {
      req = sync[method]('api')

      it(method + ' send: should self return', function() {
        Should(req.send({a:1,b:2})).be.exactly(req); })

      it(method + ' send: should set type to ' + types.json, function() {
        Should(req.type()).be.exactly(types.json);
      })

      it(method + ' send: should have `data` field', function() {
        Should(req)
          .have.property('data')
          .which.is.a.String()
          .and.be.exactly('{"a":1,"b":2}');
      })
    })

    it('should not throw when invoked without arguments', function(done) {
      req=sync.post('api')
      try { req.send() } catch(e) { done(e) }
      Should(req).not.have.property('data')
      done()
    })
  })




})(bbone.sync,
['get','post','put','delete'],
{form:'application/x-www-form-urlencoded',json:'application/json',text:'text/plain',html:'text/html'})