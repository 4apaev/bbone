var log = console.log.bind(console)
var port = 5000
var attrs='method,url,path,params,query,headers,body,cookies'.split(',')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.set('view engine', 'jade')
app.set('views', './view')

app.use(function(req, res, next) {
  log(now(), req.method, req.url, req.get('content-type')||'')
  res.set('Cache-Control', 'no-cache, no-store');
  next();
})

app.use(express.static('.'))
app.use(bodyParser.json())
app.use(function (err, req, res, next) { res.status(500)});


app.get('/', function(req, res) {
  res.render('index')
})


app.all('/api', echo)

app.all('/api/400', fail(400))
app.all('/api/401', fail(401))
app.all('/api/403', fail(403))
app.all('/api/404', fail(404))
app.all('/api/500', fail(500))


app.listen(port)


function echo(req, res) {
  res.status(200).json(attrs.reduce(function(m, k) {
    m[k]=req[k]
    return m;
  }, {}));
}

function fail(code) {
  return function(req, res) {
    return res.status(code).json({message: 'error code ' + code})
  }
}

function now() {
  return new Date().toTimeString().match(/[^\s]+/).pop()
}