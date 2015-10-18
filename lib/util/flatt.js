let slice = [].slice;
let tos = {}.toString;
let isList = x => 'A'==tos.call(a)[8];
let flatten = list => list.reduce((a, b) => a.concat(isList(b) ? flatten(b) : b), []);

function filter(fn, o) {
    let k, res = {}, arr = flatten(slice.call(arguments, 2));
    for(k in o) {
      if(fn(arr.indexOf(k)))
        res[k] = o[k];
    }
    return res
  }

module.exports.flatten = flatten
module.exports.pick = filter.bind(null, i=> i > -1)
module.exports.omit = filter.bind(null, i=> i < 0)



let slice = [].slice;
let tos = {}.toString;
let isList = x => 'A'==tos.call(a)[8];



function ls(x){
  return 'A'=={}.toString.call(x)[8]
}
function flatten(list){
    return [].reduce.call(list, function(a, b){
        return a.concat(isList(b) ? flatten(b) : b)
      }, [])
  }