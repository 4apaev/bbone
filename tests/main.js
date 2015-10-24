global.log = console.log.bind(console)
global.should = require('should')
global.sinon = require('sinon');
require('should-sinon')

require('./base')
require('./vent')
require('./egg')
require('./sync')
require('./list')