module.exports = sync;

function sync(method, url) {
  return new sync.Sync(method, url)
}

sync.Sync = require('./src/sync')

let methods = 'get,post,put,delete'.split(',');

methods.forEach(function(method){
  sync[method] = function(url, data, cb, ctx) {
    if(!url)
      throw new Error('missing url');
    let req = sync(method, url)
    return cb && req.send(data).end(cb, ctx) || req['function'===typeof data ? 'end' : 'send'](data);
  }
})


