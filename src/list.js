let Vent = require('./vent')
let inherits = require('./inherits')
let alias = require('./alias').filter
let moc = require('./list/moc')
let baseCb = require('./list/baseCb')
let flatten = require('./list/flatten')
let call = x => Function.call.bind(x)
let slice = call([].slice)
let splice = call([].splice)
let filter = call([].filter)

module.exports = List;
function List() {
  Vent.call(this);
  this.push.apply(this, flatten(arguments));
}
inherits(List, Vent);
alias(Array.prototype, List.prototype, x => !/constructor|push|unshift|pop|shift|splice/.test(x));

List.use('flatten', flatten)
List.use('pop', moc('pop', 'remove', 1))
List.use('shift', moc('shift', 'remove', 1))
List.use('splice', moc('splice', 'remove', 1))
List.use('unshift', moc('unshift', 'add'))
List.use('push', moc('push', 'add'))

List.use('remove', function(x, ctx) {
    let i = -1, n = this.length, fnc = baseCb(x);
    while(++i < n)
      fnc.call(ctx, this[i], i, this) && (splice(this, i, 1), i--, n--);
    return this.emit('remove');
  })

List.use('invoke', function(fn) {
    let argv = slice(arguments, 1);
    let cb = 'function'===typeof fn
      ? (x => fn.apply(x, argv))
      : (x => x[fn].apply(x, argv));
    return this.map(cb);
  })

List.use('filter', function(x, ctx) {
    return filter(this, baseCb(x), ctx);
  })

List.use('pluck', function(key) {
    return this.map(x => x[key]);
  })

List.use('at', function(i, x){
    let v = this[i];
    return x ? this.push.apply(this, [x].concat(this.splice(i))) : v;
  })

List.use('chain', function(method) {
    let res = this[method].apply(this, slice(arguments, 1))
    return new List(res)
  })

List.use('has', function(x) {
    return this.indexOf(x) > -1;
  })

List.use('queue', function(fn, done, ctx, i) {
    return (i=0|i) < this.length ? fn.call(ctx, this[i], i, this.queue.bind(this, fn, done, ctx, i+1)) : done();
  })

function moc(name, evt, res, val) {
    let func = Function.apply.bind([][name]);
    return function() {
      this.emit(evt, (val =func(this, arguments)));
      return res ? val : this; }}