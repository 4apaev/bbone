let dial = fn => Function.call.bind(fn)
let tos = dial({}.toString);
let index = dial([].indexOf);

function is(x) {
  return tos(x).slice(8, -1); }

is.use = function(name, type) {
  Object.defineProperty(is, name, {
    value: x => `[object ${type}]`===tos(x)
  })
  return is;
}

is.def  = x => x!=null
is.ob   = x => 'object'===typeof x && !!x
is.num  = x => 'number'==typeof x&& +x==x
is.int  = x => is.num(x) && 0===x%1 && x>-1
is.list = x => 'A'===tos(x)[8];
is.inn  = (x, y) => !!x && is.list(x) ? index(x, y)>-1 : y in x;

is.own = dial({}.hasOwnProperty);

;'String,Boolean,Function,Array,Arguments,Regexp,Date,Error,Object,Undefined'.split(',')
    .forEach(t => is.use(t.toLowerCase()
                          .replace(/(.)[aeiouy]+/g,'$1')
                          .slice(0,3), t))

module.exports = is