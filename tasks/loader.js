var fs = require('.fs')
var ts = dial({}.toString)
var own = dial({}.hasOwnProperty)
var slice = dial([].slice)
var keys = Object.keys
var log = console.log.bind(console)
var cwd = process.cwd()
var cache = Object.create(null)
var pkg = require('./package')





function read(entry, parent) {

  if(entry in cache)
    return

  var id = normalize(entry, parent)
  var body = fs.readFileSync(id).toString();
  var deps = body.match(/require\(.[\w\/\.]+.\)/g);

  var mod = deps.reduce(clearDep, {
    id: id,
    deps: [],
    body: body
  })
}

function getdeps(x){
  return x.slice(9,-2); }




function normalize(name, parent, prev) {
  if('.'==name[0]) {
    name = parent.split('/').slice(0, -1).concat(name).join('/');
    while(name.indexOf('.') > -1 && prev != name) {
      prev=name;
      name=name.replace(/\/\.\//, '/').replace(/[^\/]+\/\.\.\//, '')
    }}
  return require.resolve(name);
}


function flatten(list){
    return [].reduce.call(list, function(a, b){
        return a.concat(is(b,'A') ? flatten(b) : b)
      }, [])
  }

function is(x, t){
    return t ? t===ts(x)[8] : x!=null;
  }

function dial(fn, method){
  return Function.prototype[method||'call'].bind(fn); }

function alias(id) {
    var i=0;
    while(x=arguments[++i]) cache[x]=id;
    cache[term]=id;
    return cache; }

;'assert,buffer,child_process,cluster,crypto,dgram,dns,domain,events,fs,http,https,net,os,path,punycode,querystring,readline,stream,string_decoder,tls,tty,url,util,v8,vm,zlib'.split(',')
    .forEach(function(x){
        alias(x, `native:${x}`)
      });

