[{
  "id": "/Users/michael/Projects/lab/vent/src/defines.js",
  "source": "module.exports = defines;\nfunction defines(obj, str, fnc) {\n  var arr = str.split(':'),\n      name = arr.pop(),\n      prop = arr.pop() || 'value',\n      hex = (arr.pop() || '101').split(''),\n      desc = { configurable: !!+hex[0], enumerable: !!+hex[1]};\n  if('value' === prop && !!+hex[2])\n    desc.writable = true;\n  desc[prop] = fnc;\n  Object.defineProperty(obj, name, desc)\n  return obj;\n}\n\ndefines.alias=alias\nfunction alias(src, name, nikname, trg){\n  var desc = Object.getOwnPropertyDescriptor(src, name);\n  desc && Object.defineProperty(trg||src, nikname, desc);\n  return trg||src;\n}\n\n// function(flags, o, name, val) {\n//   Object.defineProperty(o, name, flags.reduce((d, x, i) => d[x] = !!i||val, {}))\n//   return o\n// }\n\n// let fmap = [\n//    'value'\n//   ,'value,enumerable'\n//   ,'value,configurable'\n//   ,'value,configurable,enumerable'\n//   ,'value,writable'\n//   ,'value,writable,enumerable'\n//   ,'value,writable,configurable'\n//   ,'value,writable,configurable,enumerable'\n//   ,'get'\n//   ,'get,enumerable'\n//   ,'get,configurable'\n//   ,'get,configurable,enumerable'\n//   ,'set,enumerable'\n//   ,'set,configurable'\n//   ,'set,configurable,enumerable'].forEach(s =>\n//     def[s.replace(/(\\w)\\w+,?/g,'$1')] = def.bind(null, s.split(',')))\n\n\n// 0000 { value: x, }\n// 0001 { value: x, enumerable: 1 }\n// 0010 { value: x, configurable: 1 }\n// 0011 { value: x, configurable: 1 enumerable: 1 }\n// 0100 { value: x, writable: 1 }\n// 0101 { value: x, writable: 1 enumerable: 1 }\n// 0110 { value: x, writable: 1 configurable: 1 }\n// 0111 { value: x, writable: 1 configurable: 1, enumerable: 1 }\n\n// 1000 { get: x, }\n// 1001 { get: x, enumerable: 1 }\n// 1010 { get: x, configurable: 1 }\n// 1011 { get: x, configurable: 1 enumerable: 1 }",
  "deps": {},
  "file": "/Users/michael/Projects/lab/vent/src/defines.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/src/inherits.js",
  "source": "var defines = require('./defines');\n\nmodule.exports = inherits;\nfunction inherits(A, B) {\n  if('function'!=typeof A||'function'!=typeof B)\n    throw new Error('all arguments must be from type `function`')\n  A.prototype = Object.create(B.prototype, {constructor:{value:A,enumerable:false,writable:true,configurable:true}});\n  A.super = B;\n  A.use = defines.bind(A, A.prototype);\n  return A;\n}",
  "deps": {
    "./defines": "/Users/michael/Projects/lab/vent/src/defines.js"
  },
  "file": "/Users/michael/Projects/lab/vent/src/inherits.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/src/egg.js",
  "source": "\"strict mode\"\nvar defines = require('./defines');\nvar inherits = require('./inherits');\nvar Vent = require('./vent');\n\nmodule.exports = Egg;\nfunction Egg(prop) {\n  Vent.call(this);\n  defines(this, 'shell', Object.create(null));\n  if(prop)\n    defines.alias(this, 'shell', prop)\n}\n\ninherits(Egg, Vent);\n\nEgg.use('set', function(a, b){\n    if('object'=== typeof a && a) {\n      for(var k in a)\n        this.set(k, a[k]);\n    } else {\n        var e;\n        if(this.has(a)){\n          this.get(a) !=b && (e = 'change');\n        } else {\n          e = 'create';}\n        if(e){\n          this.shell[a]=b;\n          this.emit(e, a, b);\n        }}\n    return this;\n  });\n\nEgg.use('unset', function(x){\n    if(this.has(x)) {\n      var v = this.get(x);\n      delete this.shell[x];\n      this.emit('delete', x, v); }\n    return this;\n  });\n\nEgg.use('get', function(x){ return this.shell[x] });\nEgg.use('has', function(x){ return x in this.shell });",
  "deps": {
    "./defines": "/Users/michael/Projects/lab/vent/src/defines.js",
    "./inherits": "/Users/michael/Projects/lab/vent/src/inherits.js",
    "./vent": "/Users/michael/Projects/lab/vent/src/vent.js"
  },
  "file": "/Users/michael/Projects/lab/vent/src/egg.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/src/base.js",
  "source": "module.exports = Base\n\nfunction Base(){}\nBase.prototype.toString = function() {\n  return `[object ${this.constructor.name}]`\n}\n\nBase.prototype.fail = function fail(msg, cast) {\n  var err = new Error(`${this.constructor.name}: ${msg}`);\n  if(cast) throw err;\n  return err;\n}",
  "deps": {},
  "file": "/Users/michael/Projects/lab/vent/src/base.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/src/vent.js",
  "source": "\"strict mode\"\nvar inherits = require('./inherits')\nvar defines = require('./defines')\nvar Base = require('./base')\nvar slice = [].slice\n\nmodule.exports = Vent;\nfunction Vent() {\n    let uid = Math.random().toString(36).slice(2);\n    Vent.store[uid] = Object.create(null);\n    defines(this, '000:value:uid', uid);\n    defines(this, '100:get:vents', ()=> Vent.store[uid]);\n    defines(this, '100:set:vents', x=> Vent.store[uid]=x);\n  }\n\nVent.store=Object.create(null);\ninherits(Vent, Base);\n\nVent.use('on', function(type, fx, ctx) {\n    if(arguments.length < 2)\n      this.fail('missing arguments',1);\n    let o = { fx, ctx }\n    type.split(/\\s+/g).forEach(e => (this.vents[e]||(this.vents[e]=[])).push(o));\n    return this;\n  })\n\nVent.use('off', function(type, fx) {\n    if (type) {\n        if (type in this.vents) {\n          if (fx) {\n            var x, i = -1, arr = this.vents[type];\n            while (x = arr[++i]) fx === x.fx && (arr.splice(i, 1), i--);\n          } else { delete this.vents[type]; }\n        }\n      } else { this.vents = Object.create(null); }\n    return this;\n  })\n\nVent.use('emit', function(type) {\n    let arr = this.vents[type]\n    if(arr) {\n      let x, i = -1, argv = slice.call(arguments, 1);\n        while(x=arr[++i])\n          x.fx.apply(x.ctx, argv);\n      }\n    return this;\n  })\n\nVent.use('once', function(type, fx, ctx) {\n    this.on(type, function tmp() {\n      fx.apply(ctx, arguments)\n      this.off(type, tmp);\n    }, this);\n    return this;\n  });",
  "deps": {
    "./inherits": "/Users/michael/Projects/lab/vent/src/inherits.js",
    "./defines": "/Users/michael/Projects/lab/vent/src/defines.js",
    "./base": "/Users/michael/Projects/lab/vent/src/base.js"
  },
  "file": "/Users/michael/Projects/lab/vent/src/vent.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/src/sync.js",
  "source": "var Egg = require('./egg');\nvar inherits = require('./inherits');\nvar types = { form:'x-www-form-urlencoded', json:'application/json', text:'text/plain', html:'text/html'}\n\nmodule.exports = Sync;\n\nfunction Sync(method, url) {\n  Egg.call(this, 'headers')\n  this.url = url;\n  this.method = method.toLowerCase();\n}\n\ninherits(Sync, Egg)\n\nSync.use('send',function(data) {\n  if(data) {\n    if('get'===this.method)\n      this.type('form').url += '?'+ this.serialize(data);\n    else if('object'===typeof data)\n      this.type('json').data = JSON.stringify(data);\n    else\n      this.data =''+data\n  }\n  return this;\n})\n\nSync.use('end', function(cb,ctx) {\n  let xhr = this.xhr = new XMLHttpRequest;\n  xhr.open(this.method.toUpperCase(), this.url, true);\n  xhr.onreadystatechange=() => {\n    if(4 != xhr.readyState) return\n    this.emit(this.parse(xhr).error\n              ? 'error finish'\n              : 'done finish', this.error, this.response).off();\n    cb && cb.call(ctx, this.error, this.response);\n  }\n\n  for(var k in this.emit('before').headers)\n    xhr.setRequestHeader(k, this.get(k));\n  xhr.send(this.data);\n  return this;\n})\n\nSync.use('parse', function(xhr) {\n  this.error = 200!=xhr.status ? this.fail(xhr.statusText) : null;\n  this.response = 'application/json'===xhr.getResponseHeader('Content-Type')\n    ? JSON.parse(xhr.response)  : this.error\n      ? xhr.statusText : xhr.response;\n  return this;\n})\n\nSync.use('serialize', function(x) {\n  return Object.keys(x).map(k => [k,x[k]].map(encodeURIComponent).join('=')).join('&')\n})\n\nSync.use('type', function(x) {\n  return x ? this.set('content-type', types[x.toLowerCase()]||x) : this.get('content-type');\n})",
  "deps": {
    "./inherits": "/Users/michael/Projects/lab/vent/src/inherits.js",
    "./egg": "/Users/michael/Projects/lab/vent/src/egg.js"
  },
  "file": "/Users/michael/Projects/lab/vent/src/sync.js"
}, {
  "id": "/Users/michael/Projects/lab/vent/sync.js",
  "source": "module.exports = sync;\n\nfunction sync(method, url) {\n  return new sync.Sync(method, url)\n}\n\nsync.Sync = require('./src/sync')\n\nlet methods = 'get,post,put,delete'.split(',');\n\nmethods.forEach(function(method){\n  sync[method] = function(url, data, cb, ctx) {\n    if(!url)\n      throw new Error('missing url');\n    let req = sync(method, url)\n    return cb && req.send(data).end(cb, ctx) || req['function'===typeof data ? 'end' : 'send'](data);\n  }\n})\n\n\n",
  "deps": {
    "./src/sync": "/Users/michael/Projects/lab/vent/src/sync.js"
  },
  "file": "/Users/michael/Projects/lab/vent/sync.js"
}, {
  "entry": true,
  "expose": false,
  "file": "/Users/michael/Projects/lab/vent/bbone.js",
  "id": "/Users/michael/Projects/lab/vent/bbone.js",
  "order": 0,
  "source": "module.exports.defines = require('./src/defines')\nmodule.exports.inherits = require('./src/inherits')\nmodule.exports.Vent = require('./src/vent')\nmodule.exports.Egg = require('./src/egg')\nmodule.exports.sync = require('./sync')",
  "deps": {
    "./src/defines": "/Users/michael/Projects/lab/vent/src/defines.js",
    "./src/inherits": "/Users/michael/Projects/lab/vent/src/inherits.js",
    "./src/egg": "/Users/michael/Projects/lab/vent/src/egg.js",
    "./src/vent": "/Users/michael/Projects/lab/vent/src/vent.js",
    "./sync": "/Users/michael/Projects/lab/vent/sync.js"
  }
}]
