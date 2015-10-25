(function(exports) {

  exports.Dict = Dict;

  function Dict() {
    this.map = Object.create(null)
    this.shell = Object.create(null)
  }

  Dict.prototype.set = function(a, b) {
    if('object'=== typeof a && a)
      for(var k in a)
        this.set(k, a[k]);
    else
      this.shell[this.key(a)] = this.key(b);
    return this;
  }

  Dict.prototype.get = function(k) {
    return this.shell[k]||this.shell[this.key(k)]
  }

  Dict.prototype.key = function(k) {
    return this.map[k]||k;
  }

  Dict.prototype.add = function(x) {
    var i=0, s;
    while(s=arguments[++i])
      this.map[s]=x;
    this.map[x]=this.map[x.toLowerCase()]=x;
    return this;
  }

  Dict.prototype.all = function(arr) {
    for(var i = 0; i < arr.length; i++)
      this.add.apply(this, arr[i].split(','))
    return this
  }


})(this)

dict = new Dict;
dict.all([
  'Content-Type,type',
  'text/html,html',
  'text/plain,plain',
  'application/json,json',
  'x-www-form-urlencoded,form',
])

dict.all([
  'type|Content-Type',
  'Content-Type|type',

  'html,text/html',
  'text/html,html',

  'text,text/plain',
  'text/plain,text',

  'json,application/json',
  'application/json,json',

  'form,x-www-form-urlencoded',
  'x-www-form-urlencoded,form',
])