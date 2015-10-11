global.log = console.log.bind(console)
global.should = require('should')
global.assert = require('assert')

require('./base')
require('./vent')
require('./egg')