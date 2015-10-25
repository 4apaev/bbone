'use strict';
let fs = require('fs')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()
let port = 5000
let attrs='method,url,path,params,query,headers,body,cookies'.split(',')
let log = console.log.bind(console)
let now = () => new Date().toTimeString().match(/[^\s]+/).pop()
let fail = code => (req, res) => res.status(code).json({message: 'error code ' + code})
let read = x => fs.createReadStream(`${__dirname}/${x}`)

app.set('view engine', 'jade')
app.set('views', './view')

app.use(function(req, res, next) {
  log(now(), req.method, req.url, req.get('content-type')||'')
  res.set('Cache-Control', 'no-cache, no-store');
  next();
})

app.use(express.static('.'))
app.use(bodyParser.json())
app.use((err, req, res, next) => res.status(500));

app.get('/', (req, res) => res.render('index'))


app.all('/api', echo)

app.all('/api/400', fail(400))
app.all('/api/401', fail(401))
app.all('/api/403', fail(403))
app.all('/api/404', fail(404))
app.all('/api/500', fail(500))


app.get('/api/lib/:name', (req, res) => read(`node_modules/${req.params.name}/package.json`).pipe(res.type('json')))

app.listen(port)

function echo(req, res) {
  res.status(200).json(attrs.reduce((m, k) => {
    m[k]=req[k]
    return m;
  }, {}));
}