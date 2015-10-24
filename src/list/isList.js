let tos = Function.call.bind({}.toString);
let isList = x => 'A'==tos(x)[8];
module.exports = isList