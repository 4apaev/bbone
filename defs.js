'use strict';

;(function (def, fmap, exports) {

  exports.def = def;
  fmap.forEach(function (s) {
    return def[s.replace(/(\w)\w+,?/g, '$1')] = def.bind(null, s.split(','));
  });
})(function (flags, o, name, val) {
  Object.defineProperty(o, name, flags.reduce(function (d, x, i) {
    return d[x] = !!i || val;
  }, {}));
  return o;
}, ['value', 'value,enumerable', 'value,configurable', 'value,configurable,enumerable', 'value,writable', 'value,writable,enumerable', 'value,writable,configurable', 'value,writable,configurable,enumerable', 'get', 'get,enumerable', 'get,configurable', 'get,configurable,enumerable', 'set,enumerable', 'set,configurable', 'set,configurable,enumerable'], undefined);

// module.exports = defines;

// function defines(obj, str, fnc) {
//   var arr = str.split(':'),
//       name = arr.pop(),
//       prop = arr.pop() || 'value',
//       hex = (arr.pop() || '101').split(''),
//       desc = { configurable: !!+hex[0], enumerable: !!+hex[1]};
//   if('value' === prop && !!+hex[2])
//     desc.writable = true;
//   desc[prop] = fnc;
//   Object.defineProperty(obj, name, desc)
//   return obj;
// }

// function alias(src, name, nikname, trg){
//   var desc = Object.getOwnPropertyDescriptor(src, name);
//   desc && Object.defineProperty(trg||src, nikname, desc);
// }

// 0000 { value: x, }
// 0001 { value: x, enumerable: 1 }
// 0010 { value: x, configurable: 1 }
// 0011 { value: x, configurable: 1 enumerable: 1 }
// 0100 { value: x, writable: 1 }
// 0101 { value: x, writable: 1 enumerable: 1 }
// 0110 { value: x, writable: 1 configurable: 1 }
// 0111 { value: x, writable: 1 configurable: 1, enumerable: 1 }
// 1000 { get: x, }
// 1001 { get: x, enumerable: 1 }
// 1010 { get: x, configurable: 1 }
// 1011 { get: x, configurable: 1 enumerable: 1 }


