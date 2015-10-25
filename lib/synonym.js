module.exports = function(arr) {
  var map = Object.create(null);

  function synonym(x) {
      var i=0, s;
      while(s=arguments[++i])
        map[s]=x;
      map[x]=map[x.toLowerCase()]=x;
    }

  function get(x, def) {
      return map[x] || map[x.toLowerCase()] || map[def] || def;
    }

  synonym.each = function(arr) {
    for(var i = 0; i < arr.length; i++)
      synonym.apply(null, arr[i].split(','))
    return synonym
  }

  synonym.get=get
  synonym.map=map
  return arr ? synonym.each(arr) : synonym;
}