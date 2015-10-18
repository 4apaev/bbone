let Vent = require('./vent')
let methods = 'push,unshift,pop,shift,splice'.split(',')
let dial = (fn, name) => Function[name||'call'].bind(fn)
let tos = dial({}.toString);
let filter = dial([].filter)
let reduce = dial([].reduce)
let isList = x => 'A'==tos(x)[8];

function List() {
  Vent.call(this);
  this.push.apply(this, this.flatten(arguments));
}
require('./inherits')(List, Vent);
require('./alias').filter(Array.prototype, List.prototype, x => !/constructor|push|unshift|pop|shift|splice/.test(x));
methods.forEach(moc);
module.exports = List;

List.use('flatten', function flatten(list) {
    return reduce(list, (a, b) => a.concat(isList(b) ? flatten(b) : b), [])
  })

List.use('invoke', function(fn) {
    let argv = this.slice.call(arguments, 1);
    return this.map('function'===typeof fn ? x => fn.apply(x, argv) : x => x[fn].apply(x, argv));
  })

List.use('remove', function(x, ctx) {
    let i = -1, n = this.length, fnc = makeCb(x);
    while(++i < n)
      fnc.call(ctx, this[i], i, this) && (this.splice(i, 1), i--, n--);
    return this.emit('remove');
  })

List.use('at', function(i, x){
    var v = this[i];
    return x ? this.push.apply(this, [x, v].concat(this.splice(i))) : v;
  })

List.use('pluck', function(key) {
    return this.map(x => x[key]);
  })

List.use('filter', function(x, ctx) {
    return filter(this, makeCb(x), ctx);
  })

List.use('has', function(x) {
    return this.indexOf(x) > -1;
  })

function makeCb(x) {
  let tp = typeof x
  if('function'===tp)
    return x
  if('string'===tp)
    return (o => x in o);
  let ks = Object.keys(x);
  let fn = o => ks.every(k => k in o && x[k] === o[k]);
  return fn
}

function moc(method) {
  let v
  let fn = dial([][method], 'apply');
  let flag = /push|unshift/.test(method)
  let evt = flag ? 'add' : 'remove';
  List.use(method, function() {
      this.emit(evt, (v =fn(this, arguments)));
      return flag ? this : v;
    });
}