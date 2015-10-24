let dial = fn => Function.call.bind(fn)
let tos = dial({}.toString);
let index = dial([].indexOf);

is.use = function(name, type) {
  Object.defineProperty(is, name, {
    value: x => `[object ${type}]`===tos(x)
  })
  return is;
}

is.def  = x => x!=null
is.obj  = x => 'object'===typeof x && !!x
is.num  = x => 'number'==typeof x&& +x==x
is.int  = x => is.num(x) && 0===x%1 && x>-1
is.list = x => 'A'===tos(x)[8];
is.inn  = (x, y) => !!x && is.list(x) ? index(x, y)>-1 : y in x;

is.own = dial({}.hasOwnProperty);

;'str:String,fnc:Function,arr:Array,arg:Arguments,Obj:Object,und:Undefined'.split(',').forEach(t => is.use(t.slice(0,3), t.slice(4)))

module.exports = is

function is(x) {
  return tos(x).slice(8, -1); }