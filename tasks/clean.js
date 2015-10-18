`!function(f){'object'==typeof exports?module.exports=f():'function'==typeof define&&define.amd?define(f):'undefined'!=typeof window?window.${NS}=f():'undefined'!=typeof global&&(global.${NS}=f())}(function(){
  var define,module,exports;
  return ${BODY};
})();`


var fs = require('fs')
var head = '(function(f){ if(typeof exports=="object"&&typeof module!="undefined"){module.exports=f();}else if(typeof define=="function"){define([],f)}else{this.bbone=f();} })(function(){var define,module,exports; return function e(t,n,r){ function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module "+o)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({'
var rgx = /([\s\S]+)(\s+1: \[ function\(require, module, exports\) \{)/
var file = './dist/bbone.js'
fs.writeFileSync(file, fs.readFileSync(file).toString().replace(rgx, head+'\n  $2'))


`(function(factory){
  'object'==typeof exports?module.exports=factory():'function'==typeof define&&define.amd?define(factory):${root}.${ns}=factory();
})`

`(function() {
  var define,module,exports;
  return ${OUTER}({
    ${MOULES}
  }, { ${CACHE} }, [ ${ENTRIES} ])(${ENTRY})
})`

(function outer(modules,cache,entry){
  var prevReq = 'function' == typeof require && require;
  function newReq(name,jumped){
    if(!cache[name]){
      if(!modules[name]){
        var currReq = 'function' == typeof require && require;
        if(!jumped&&currReq)return currReq(name,!0);
        if(prevReq)return prevReq(name,!0);
        throw new Error('Cannot find module '+name)}
      var m = cache[name] = {exports:{}};
      modules[name][0].call(m.exports, function(x){
        var id = modules[name][1][x];
        return newReq(id ? id : x);},m,m.exports,outer,modules,cache,entry)}
    return cache[name].exports; }
  for(var i = 0; i < entry.length; i++) newReq(entry[i]);
  return newReq
})