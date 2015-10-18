var Egg = require('./egg');
var inherits = require('./inherits');
var types = { form:'x-www-form-urlencoded', json:'application/json', text:'text/plain', html:'text/html'}

module.exports = Sync;

function Sync(method, url) {
  Egg.call(this, 'headers')
  this.url = url;
  this.method = method.toLowerCase();
}

inherits(Sync, Egg)

Sync.use('send',function(data) {
  if(data) {
    if('get'===this.method)
      this.type('form').url += '?'+ this.serialize(data);
    else if('object'===typeof data)
      this.type('json').data = JSON.stringify(data);
    else
      this.data =''+data
  }
  return this;
})

Sync.use('end', function(cb,ctx) {
  let xhr = this.xhr = new XMLHttpRequest;
  xhr.open(this.method.toUpperCase(), this.url, true);
  xhr.onreadystatechange=() => {
    if(4 != xhr.readyState) return
    this.emit(this.parse(xhr).error
              ? 'error finish'
              : 'done finish', this.error, this.response).off();
    cb && cb.call(ctx, this.error, this.response);
  }

  for(var k in this.emit('before').headers)
    xhr.setRequestHeader(k, this.get(k));
  xhr.send(this.data);
  return this;
})

Sync.use('parse', function(xhr) {
  this.error = 200!=xhr.status ? this.fail(xhr.statusText) : null;
  this.response = 'application/json'===xhr.getResponseHeader('Content-Type')
    ? JSON.parse(xhr.response)  : this.error
      ? xhr.statusText : xhr.response;
  return this;
})

Sync.use('serialize', function(x) {
  return Object.keys(x).map(k => [k,x[k]].map(encodeURIComponent).join('=')).join('&')
})

Sync.use('type', function(x) {
  return x ? this.set('content-type', types[x.toLowerCase()]||x) : this.get('content-type');
})