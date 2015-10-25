let Vent = require('./vent');
let inherits = require('./inherits');
let serialize = require('./sync/serialize');
let map = {auth:'Authorization', type: 'Content-Type'}
let types = {form:'application/x-www-form-urlencoded', json:'application/json', text:'text/plain', html:'text/html'}
let key = x => x in map ? map[x] : x in types ? types[x] : x;
module.exports = Sync;

function Sync(method, url) {
  Vent.call(this)
  let head = Object.create(null)

  this.url = url;
  Sync.defines(this, '100:get:method', ()=> method.toUpperCase())
  Sync.defines(this, '100:set:method', x => method=x)

  this.get = x => x ? head[key(x)] : head;
  this.set = (a,b) => {
    if('object'===typeof a)
      for(let k in a)
        this.set(k, a[k]);
    else
      head[key(a)] = key(b);
    return this;
  }
}
inherits(Sync, Vent)

Sync.use('send', function(x) { return this['object'===typeof x ? 'GET'===this.method ? 'query' : 'json' : 'text'](x) })
    .use('json', function(x) { return setup.call(this, 'json', 'data', JSON.stringify, x) })
    .use('query',function(x) { return setup.call(this, 'form', 'url', this.serialize.bind(this), x) })
    .use('text', function(x) { return setup.call(this, 'text', 'data', String, x) })
    .use('type', function(x) { return x ? this.set('type', x) : this.get('type') })
    .use('before', function(fn, ctx) { return this.on('before', fn, ctx||this) })
    .use('serialize', function(x) { return this.url=this.url.split('?').shift()+serialize(x)})

  .use('end', function(cb,ctx) {
    cb && this.once('finish', cb, ctx)
    this.xhr = new XMLHttpRequest
    this.xhr.open(this.method, this.url, true)
    this.emit('before', this)
    this.xhr.onload = this.parse.bind(this)

    let head = this.get()
    for(let k in head)
      this.xhr.setRequestHeader(k, head[k]);
    return this.xhr.send(this.data), this; })

  .use('pipe', function() {
    let end = this.end.bind(this);
    return new Promise((resolve, reject) => end((err, res) => err ? reject(err) : resolve(res))); })


  .use('parse', function() {
    let xhr = this.xhr
    let err = this.error = 200===xhr.status  ? null : this.fail(xhr.statusText);
    let match = (''+xhr.getResponseHeader('content-type')).match(/\/([\w-]+)/)||[,'text']
    let ctype = this.ctype = match[1];

    let res = this.response = 'json'===ctype
      ? 'object'===typeof xhr.response
        ? xhr.response
        : JSON.parse(xhr.response)
      : xhr.response;
    return this.emit(err ? 'error' : 'done', err, res).emit('finish', err, res);
  });

function setup(type, prop, fn, data) {
    if(data!=null)
      this.set('type', type)[prop] = fn(data)
    return this
  }