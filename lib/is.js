var tos = dial({}.toString);
var own = dial({}.hasOwnProperty);
var index = dial([].indexOf);
var types = 'String,Boolean,Function,Array,Arguments,Regexp,Date,Error,Object,Undefined,Null'.split(',');

function is(x) {
  return tos(x).slice(8, -1); }

is.use = function(type) {
  var stamp = `[object ${type}]`,
      name = shrink(type, 3);
  Object.defineProperty(is, name, {value: x => stamp===tos(x)})
  return is;
}

function def(x) { return x!=null;}
function num(x) { return 'number'==typeof x&& +x==x;}
function int(x) { return num(x) && 0===x%1&&x>-1 }
function inn(x, y) { return !!x && list(x) ? index(x, y)>-1 : y in x; }
function list(x) { return 'A'===tos(x).charAt(8) }
function o(x){return !!x&&'object'===typeof x }

function dial(method) {
  return Function.prototype.call.bind(method);}

function alias(a, b, name, nikname) {
  var desc = Object.getOwnPropertyDescriptor(a, name);
  desc && Object.defineProperty(b, nikname||name, desc);
  return b; }

function shrink(x, i) {
  return x.toLowerCase().replace(/(.)[aeiouy]+/g,'$1').slice(0,i) }

is.own = own;
is.alias = alias.bind(null,is,is);
[def,num,int,inn,list,o].forEach(f => is[f.name]=f);
types.forEach(is.use, is);

module.exports.is = is
module.exports.dial = dial
module.exports.alias = alias

// { value: x => stamp===tos(x) }