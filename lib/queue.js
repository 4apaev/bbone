function queue(steps, done) {
  var i = 0, tmp, fn;
  function next(err) {
    if(err, !steps[i])
      return done(err);
    try {
      fn = steps[i++]
      tmp = fn(tmp, next)
      return ;
    } catch(e) {
      return next(e);
    }
  }
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





digits='one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty'.split(',')

function eachRec(arr, fn, i, ctx) {
  if(i < arr.length) {
    fn.call(ctx, arr[i], i, arr);
    eachRec(arr, fn, i+1, ctx);
  } else {
    log('done')
  }
}


eachRec(digits, function(x,i,a) {
  log(`i: ${i}, x: ${x}, ctx:${this.name}`)
}, 0, {
  name: 'example one'
})





function each(arr, visit, done, i) {
  i=0|i;
  if(i < arr.length)
    visit(arr[i], i, each.bind(null, arr, visit, done, i+1));
  else
    done();
}






each(digits, function(x, i, next) {
  log(`i: ${i}, x: ${x}`)
  next();
}, logger('done'));
