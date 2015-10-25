let chains = 'join,concat,reverse,slice,sort,filter,some,every,map,reduce,pop,shift,splice,unshift,push,remove,invoke,pluck,at,has'.split(',')

List.use('chain', function() {

  var o = {}
  var cache = o.cache = [this.slice()];

  chains.forEach(function(k) {
    Object.defineProperty(o, k, {
      value: function() {
        var ls = new List(cache[0])
        cache.unshift(ls[k].apply(ls, arguments));
        return this;
      }
    })
  })
  return o
})

