var Egg = require('./egg');
var inherits = require('./inherits');
var types = {form:'x-www-form-urlencoded',json:'application/json',text:'text/plain',html:'text/html'};

module.exports = Sync;
function Sync(method, url) {
  Egg.call(this)
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
  return Object.keys(x).map(function(k) {
    return [k,x[k]].map(encodeURIComponent).join('='); }).join('&')
})

Sync.use('type', function(x) {
  return x ? this.set('content-type', types[x.toLowerCase()]||x) : this.get('content-type'); })

Sync.use('end', function() {
  var xhr = this.xhr = new XMLHttpRequest;
  xhr.open(this.method.toUpperCase(), this.url, true);
  xhr.onreadystatechange=function() {
    if(4!=xhr.readyState) return;
    this.emit('done', this.parse(xhr).error, this.response, this)
  }.bind(this)

  for(var k in this.shell)
    xhr.setRequestHeader(k, this.shell[k])
  xhr.send(this.data);
  return this;
})

Sync.use('parse', function(xhr) {
  var status = this.status = xhr.status;
  var err = this.error = 200!=status ? new Error(xhr.statusText) : null;
  this.ok = !err;
  this.response = -1===xhr.getAllResponseHeaders().indexOf('json') ? xhr.response : JSON.parse(xhr.response);
  return this;
})