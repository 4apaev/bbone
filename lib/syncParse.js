let iso = x=> !!x && 'object'===typeof x
let iss = x=> !!x && 'string'===typeof x
let isf = x=> !!x && 'function'===typeof x

let inn = {'application/x-www-form-urlencoded': decode, 'application/json': JSON.parse,     'text/plain': yep }
let out = {'application/x-www-form-urlencoded': encode, 'application/json': JSON.stringify, 'text/plain': tos }


function decode(x) {
  var chunks = x.match(/[^\&\=]/g)
  for(var i=0, j=1, o={}; j < chunks.length; i+=2, j+=2)
    o[decodeURIComponent(chunks[i])]=decodeURIComponent(chunks[j]);
  return o
}

function encode(x) {
  var k, buf=[];
  for(k in x)
    buf.push(iso(x[k]) ? encode(x[k]) : `${encodeURIComponent(k)}=${encodeURIComponent(x[k])}`);
  return buf.filter(Boolean).join('&')
}

function serialize(req) {

  if(iso(req.data)){
    req.type('get'===req.method ? 'form' : 'json')


  }


  return {url:url, data:data, type:type }

}





function parseHead(m,line) {
  var x = line.match(/(.+?)\:\s(.+?)(?:\;|$)/m)
  m[x[1].toLowerCase()]=x[2]
  return m
}


xhr.getAllResponseHeaders().trim().split('\n').reduce(parseHead, {})
xhr.getResponseHeader('date')
new Date(xhr.getResponseHeader('date'))

let match = xhr.getResponseHeader('content-type').match(/\/([\w-]+)/);
let tp = match&&match[1]

(xhr.getResponseHeader('content-type').match(/\/([\w-]+)/)||[,'plain']).replace('x-www-form-urlencoded','form')







function yep(x) {return x}
function tos(x) {return ''+x}
function noop() {}


// types = {
//   html: 'text/html',
//   html: 'text/plain',
//   json: 'application/json',
//   xml:  'application/xml',
//   form: 'application/x-www-form-urlencoded'
// }
// tps = {
//   'application/json',
//   'application/x-www-form-urlencoded'
// }

// function invert(x) {
//   var o={}
//   for(var k in x) o[x[k]]=k
//   return o
// }