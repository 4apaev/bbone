var flags = 'configurable,enumerable,writable'.split(',');

function def(obj, str, fnc) {
    var desc = {}, arr = str.split(':');
    arr.shift().split('').forEach(function(x,i) {
        desc[flags[i]] = !!+x;
      });
    desc[arr.shift()]=fnc;
    Object.defineProperty(obj, arr.shift(), desc);
    return obj;
  }

function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, { constructor: { value: ctor, enumerable: false, writable: true, configurable: true }});
    ctor.extend = function(proto){
        var fn = inherits(function Child(){
            ctor.apply(this, arguments);
          }, ctor);
        for(var k in proto)
          fn.use(k, proto[k]);
        return fn;
      }
    ctor.use = function(key, val){
        var x = /\d+\:/.test(key) ? key : '101:value:'+key
        def(ctor.prototype, x, val);
        return ctor;
      }
    return ctor;
  }

module.exports.def = def;
module.exports.inherits = inherits;

// model = new Egg;

// model.set('krote', 'ololo')
// model.set('krote', 'aaaa')
// model.del('krote')
// model.del({a:1,b:2,c:3})
// model.set({a:1,b:2,c:3})

// Vent.use('krote', function() {
//   log('krote','krote','krote')
// })



// exports.log = console.log.bind(console);
// exports.slice = Function.prototype.call.bind([].slice)
