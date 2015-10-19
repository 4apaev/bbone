function flatten(list){
    return [].reduce.call(list, function(a, b){
        return a.concat(isList(b) ? flatten(b) : b)
      }, [])
  }
module.exports = flatten;

let slice = [].slice;
let tos = {}.toString;
let isList = x => 'A'==tos.call(a)[8];
let flatten = list => list.reduce((a, b) => a.concat(isList(b) ? flatten(b) : b), []);



let slice = [].slice;
let tos = {}.toString;
let isList = x => 'A'==tos.call(a)[8];



// function ls(x){
//   return 'A'=={}.toString.call(x)[8]
// }
// function flatten(list){
//     return [].reduce.call(list, function(a, b){
//         return a.concat(isList(b) ? flatten(b) : b)
//       }, [])
//   }