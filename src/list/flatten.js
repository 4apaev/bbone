let isList = require('./isList')
let reduce = Function.call.bind([].reduce)
let flatten = list => reduce(list, (a, b) => a.concat(isList(b) ? flatten(b) : b), [])
module.exports = flatten