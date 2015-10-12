var Egg = require('./egg');
var inherits = require('./inherits');
var defines = require('./defines');
var types = {form:'x-www-form-urlencoded',json:'application/json',text:'text/plain',html:'text/html'};
var methods = ['get','post','put','delete'];

module.exports = sync;

function Sync(method, url) {
  Egg.call(this, 'headers')
  this.url = url;
  this.method = method.toLowerCase();
}

inherits(Sync, Egg)

Sync.use('send',function(data) {
  if(data) {
    if('get'===this.method)
      this.type('form').url += this.serialize(data);
    else if('object'===typeof data)
      this.type('json').data = JSON.stringify(data);
    else
      this.data =''+data
  }
  return this;
})

Sync.use('serialize', function(x) {
  return Object.keys(x).map(k => [k,x[k]].map(encodeURIComponent).join('=')).join('&')
})

Sync.use('type', function(x) {
  return x ? this.set('content-type', types[x.toLowerCase()]||x) : this.get('content-type'); })

Sync.use('end', function(cb, ctx) {
  var xhr = this.xhr = new XMLHttpRequest;
  xhr.open(this.method.toUpperCase(), this.url, true);

  xhr.onreadystatechange=() => 4===xhr.readyState &&
    this.parse(xhr).emit(this.error
                         ? 'error'
                         : 'done', this.error, this.response, this);

  for(var k in this.headers)
    xhr.setRequestHeader(k, this.get(k));

  cb&&'function'==typeof cb&&this.once('done', cb, ctx).once('error', cb, ctx);

  xhr.send(this.data);
  return this;
})

Sync.use('parse', function(xhr) {
  var status = this.status = xhr.status;
  var err = this.error = 200!=status ? this.fail(xhr.statusText) : null;
  this.ok = !err;
  this.response = -1===xhr.getAllResponseHeaders().indexOf('json') ? xhr.response : JSON.parse(xhr.response);
  return this;
})

function sync(method, url) { return new sync.Sync(method, url) }

defines(sync, '100:value:Sync', Sync)

methods.forEach(method => {
  defines(sync, `101:value:${method}`, (url, data, cb, ctx)=>{
    var req = sync(method, url)
    if('function'==typeof data) cb=data, data=null;
    if(data) req.send(data);
    if('function'==typeof cb) req.end(cb, ctx);
    return req; })})