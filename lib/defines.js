module.exports = defines;

let defines = (flags, obj, name, val) =>
  Object.defineProperty(obj, name, flags.reduce((desc, flags, i) =>
      desc[flag] = !!i||val, {}))


let fmap = [
   ['value']
  ,['value','enumerable']
  ,['value','configurable']
  ,['value','configurable','enumerable']
  ,['value','writable']
  ,['value','writable','enumerable']
  ,['value','writable','configurable']
  ,['value','writable','configurable','enumerable']
  ,['get']
  ,['get','enumerable']
  ,['get','configurable']
  ,['get','configurable','enumerable']
  ,['set','enumerable']
  ,['set','configurable']
  ,['set','configurable','enumerable']]




0000 { value: x, }
0001 { value: x, enumerable: !0 }
0010 { value: x, configurable: !0 }
0011 { value: x, configurable: !0 enumerable: !0 }
0100 { value: x, writable: !0 }
0101 { value: x, writable: !0 enumerable: !0 }
0110 { value: x, writable: !0 configurable: !0 }
0111 { value: x, writable: !0 configurable: !0, enumerable: !0 }

1000 { get: x, }
1001 { get: x, enumerable: !0 }
1010 { get: x, configurable: !0 }
1011 { get: x, configurable: !0 enumerable: !0 }