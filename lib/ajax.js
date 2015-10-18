let emap = { beforeSend: 'before', complete: 'finish', always: 'finish', error: 'error', fail: 'error', done: 'done', success: 'done' }

module.exports = ajax
function ajax(sync, o) {
  let req = sync(o.method || o.type || 'get', o.url)
  let ctx = o.ctx

  'data' in o && req.send(o.data);
  'headers' in o && req.set(o.headers);
  'contentType' in o && req.type(o.contentType);

  for(let e in emap)
    e in o && req.on(e, o[e], ctx);

  return new Promise((resolve, reject)=>{
    req.end((err, res)=>{
      err && reject(err) || resolve(res);
    })
  })
}