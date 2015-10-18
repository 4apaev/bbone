function queue(steps, done) {
  var i = 0, tmp, fn;
  function next(err) {
    if(err, !steps[i])
      return done(err, tmp);
    try {
      fn = steps[i++];
      tmp = fn(tmp, next);
      }
        catch(e){
            return next(e);
          }}
  next();
}

function each(o, fn, ctx) {
  queue(Object.keys(o).map(function(k) {
      var cb = function(memo, next) {
          return fn.call(ctx, memo, o[k], k, o, next)
        }
      return cb;
    }), logger('done'))
}

// function reduce(o, fn, m, ctx) {
//   each(o, function(v,k,o,next) {
//       m = fn.call(ctx,m,v,k,o,next)
//     }, ctx);
//   return m
// }

reduce(localStorage, function(m,v,k,o,next){
  m[k]=JSON.parse(v);
  log(k)
  next();
}, {});





// function reduce(o, fn, m, ctx) {
//   each(o, function(v,k,o,next) {
//       m = fn.call(ctx,m,v,k,o,next)
//     }, ctx);
//   return m
// }

reduce(localStorage, function(m,v,k,o,next){
  m[k]=JSON.parse(v);
  log(k)
  next();
}, {});