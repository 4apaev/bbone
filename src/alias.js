let alias = (src, a, b, trg) => Object.defineProperty(trg||src, b||a, Object.getOwnPropertyDescriptor(src, a));
let each = (src, trg, props) => props.forEach(x => alias(src, x, x, trg))
let filter = (src, trg, fn) => each(src, trg, Object.getOwnPropertyNames(src).filter(fn))

alias.each = each
alias.filter = filter

module.exports = alias