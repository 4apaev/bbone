var defines = require('./defines');

module.exports = inherits;
function inherits(A, B) {
  if('function'!=typeof A||'function'!=typeof B)
    throw new Error('all arguments must be from type `function`')
  A.prototype = Object.create(B.prototype, {constructor:{value:A,writable:true,configurable:true}});
  A.super = B;
  A.use = (name, func)=>defines(A.prototype, name, func)

  return A;
}