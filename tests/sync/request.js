(function(sync, methods, types) {

  function run(method, args) {
    return function(done) {
      try {
        var result = sync[method].apply(sync, args);
      }
        catch(e) {
          return done(e);
        }
      done();
    }}

  describe('sync: invoke with arguments', function() {
    var url='api', data={a:'data'}, ctx={name:'context'};

    methods.forEach(function(method, i) {

      var ttl = method.toUpperCase();
      var prop = 'GET' === ttl ? 'query': 'body'

      it(`should ${ttl} with url only`, run(method, [url]));
      it(`should ${ttl} with url and data`, run(method, [url, data]));
      it(`should ${ttl} with url and callback`, function(done) {
        var req = sync[method](url, function(err, res) {
          Should(req.xhr).have.property('status', 200)
          done(err)
        });
      })

      it(`should ${ttl} with url, callback, data and context`, function(done) {
        var req = sync[method](url, data, function(err, res) {
          Should(this).be.exactly(ctx)
          Should(res).have.property(prop).and.be.eql(data)
          done(err)
        }, ctx);
      })
    })
  })

  describe('sync: errors', function() {
    it('first argument of callback, should be an error', function(done) {
      var req=sync.post('api/500')
      req.end(function(err, res) {
        Should(err).be.an.Error()
        done()
      })
    })
  })


  describe('sync: pipe', function() {
    var req = sync.get('/api')
    var prm = req.pipe();

    it('should return promise', function() {
      Should(prm).be.instanceOf(Promise)
    })

    it('should chain `then` callbacks', function(done) {
      prm.then(function(d) {
        return d.url
      }).then(function(u) {
        Should(u).be.equal('/api');
        done();
      })
    })
  })

  describe('sync: emit', function() {
    var ok=0, err=0, fin=0;
    var req = sync.get('/api')
                  .on('done',   function(){ ++ok})
                  .on('error',  function(){ ++err})
                  .on('finish', function(){ ++fin});

    it('should emit `done` and `finish` events', function(done) {
      req.end(function() {
        Should(ok).be.equal(1);
        Should(fin).be.equal(1);
        Should(err).be.equal(0);
        done()
      })
    })

    it('should emit `error` and `finish` events', function(done) {
      req.url = '/api/500';
      req.end(function() {
        Should(ok).be.equal(1);
        Should(fin).be.equal(2);
        Should(err).be.equal(1);
        done();
        req.off();
      })
    })

    it('should emit `before` event', function(done) {

      var req = sync.get('/api');
      req.on('before', function(obj){
        Should(obj.set('Authorization', 'kekeke')).be.exactly(req);
      })
      Should(req.headers).be.empty();

      req.end(function() {
        Should(req.headers).have.property('Authorization', 'kekeke');
        done()
      })
    })
  })

})(bbone.sync,
['get','post','put','delete'],
{form:'x-www-form-urlencoded',json:'application/json',text:'text/plain',html:'text/html'})