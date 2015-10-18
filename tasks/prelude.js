module.exports = (ROOT='this', NS='MyLib', modules='', entry='', main=1) => `
(function(f){'object'==typeof exports?module.exports=f():'function'==typeof define&&define.amd?define(f):${ROOT}.${NS}=f();})(function(){
  var define,module,exports;return (function outer(modules,cache,entry){var prev='function'==typeof require&&require;function req(name,jumped){if(!cache[name]){if(!modules[name]){
  var curr='function'==typeof require&&require;if(!jumped&&curr)return curr(name,!0);if(prev)return prev(name,!0);throw new Error('Cannot find module '+name)}
  var m=cache[name]={exports:{}};modules[name][0].call(m.exports,function(x){var id=modules[name][1][x];return req(id?id:x);},m,m.exports,outer,modules,cache,entry)}
  return cache[name].exports;};for(var i=0;i< entry.length;i++){req(entry[i])};return req;})({
    ${modules}
  },{},[${entry}])(${main})
})`






// function wrapModule(id, content, deps) {
//   var body = `
//   ${id}: [function(require,module,exports) {
//     ${content}
//   }, {${deps}}]`;
//   return body
// }

function wrapModule(id, content, deps) {
  var body = `
  ${id}: [function(require,module,exports) {
    ${content}
  }, {${deps}}]`;
  return body
}

function wrapExport(root, ns, moules, entry, main) {
  var body = `(function(f){'object'==typeof exports?module.exports=f():'function'==typeof define&&define.amd?define(f):${root}.${ns}=f();})(function(){
  var define,module,exports;return ${outer}({
    ${moules}
  },${cache},${entry})(${main})
})`
  return body
}
var outer= `(function outer(modules,cache,entry){var prev='function'==typeof require&&require;function req(name,jumped){if(!cache[name]){if(!modules[name]){
  var curr='function'==typeof require&&require;if(!jumped&&curr)return curr(name,!0);if(prev)return prev(name,!0);throw new Error('Cannot find module '+name)}
  var m=cache[name]={exports:{}};modules[name][0].call(m.exports,function(x){var id=modules[name][1][x];return req(id?id:x);},m,m.exports,outer,modules,cache,entry)}
  return cache[name].exports;};for(var i=0;i< entry.length;i++){req(entry[i])};return req;})`


var head = `
(function(f){
  'object'==typeof exports?module.exports=f():'function'==typeof define&&define.amd?define(f):{{ROOT}}.{{NS}}=f();
})(function(){
  var define,module,exports;return ${outer}
})`



