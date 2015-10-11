var slice = [].slice

function flatt() {
    for(var x, i = 0, arr = []; i < arguments.length; i++) {
        if('A'==={}.toString.call(x=arguments[i]).charAt(8))
            arr.push.apply(arr, flatt.apply(null, x));
          else
              arr.push(x);
      }
    return arr;
  }

function filter(fn, o) {
    var res = {}, arr = flatt(slice.call(arguments, 2));
    for(var k in o) {
      if(fn(arr.indexOf(k)))
        res[k] = o[k];
    }
    return res
  }

module.exports.flatt = flatt
module.exports.pick = filter.bind(null, function(i) { return i > -1 })
module.exports.omit = filter.bind(null, function(i) { return i < 0 })