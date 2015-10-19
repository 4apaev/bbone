let Vent = require('./vent')
let inherits = require('./inherits')
let alias = require('./alias').filter
let moc = require('./list/moc')
let baseCb = require('./list/baseCb')
let call = x => Function.call.bind(x)
let slice = call([].slice)
let splice = call([].splice)
let filter = call([].filter)
let reduce = call([].reduce)
let tos = call({}.toString)
let isList = List.isList = x => 'A'==tos(x)[8];
let flatten = list => reduce(list, (a, b) => a.concat(isList(b) ? flatten(b) : b), [])
module.exports = List;

function List() {
  Vent.call(this);
  this.push.apply(this, flatten(arguments));
}

inherits(List, Vent);
alias(Array.prototype, List.prototype, x => !/constructor|push|unshift|pop|shift|splice/.test(x));

List.use('pop', moc('pop', 'remove'))
List.use('shift', moc('shift', 'remove'))
List.use('splice', moc('splice', 'remove', 1))
List.use('unshift', moc('unshift', 'add', 1))
List.use('push', moc('push', 'add', 1))

List.use('remove', function(x, ctx) {
    let i = -1;
    let n = this.length;
    let fnc = baseCb(x);
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

List.use('has', function(x) {
    return this.indexOf(x) > -1;
  })