#!/bin/bash

browserify -t [ babelify --loose all ] src/agent.js -s agent -o dist/agent.js
# browserify -t [ babelify --loose all ] src/egg.js -s Egg -o dist/egg.js
# browserify -t [ babelify --loose all ] src/vent.js -s Vent -o dist/vent.js
# browserify -t [ babelify --loose all ] lib/is.js -s is | uglifyjs -o dist/is.js --screw-ie8 -c


# browserify -t babelify ./src/emmiter.js --standalone bbone | uglifyjs -o ./dist/emmiter.js  -b indent-level=2
# browserify -d -e ./src/model.js -t babelify -o ./dist/bbone-es6.js

# browserify -d -e ./src/model.js -t [ babelify --loose all ] -o ./dist/model.js
# browserify -d -e ./src/model.js -t [ babelify --loose all ] -o ./dist/model.js


# browserify -d -e ./bbone.js -t [ babelify --loose all ] -o ./dist/bbone.js
# browserify -t [ babelify --loose all ] -d -e ./bbone.js -s bbone | uglifyjs -o ./dist/bbone.js  -b indent-level=2
# browserify -t [ babelify --loose all ] -d -e ./bbone.js -s bbone -o ./dist/bbone.js

# browserify -d -e ./bbone-es6.js -t [ babelify --loose all ] -o ./dist/bbone-es6.js
# browserify -d -e ./src/model.js -t [ babelify --loose es6.classes,es6.properties.computed ] -o ./dist/model.js

# babel --loose es6.classes,es6.properties.computed ./src/model.js -o ./dist/model.js

# browserify -t babelify ./src/vent.js | uglifyjs -o ./dist/vent.js  -b indent-level=2
# browserify -t babelify ./bbone.js --standalone bbone  | uglifyjs -o ./dist/bbone.js  -b indent-level=2

# browserify ./src/vent.js | uglifyjs -o ./dist/vent.js  -b indent-level=2
# browserify ./bbone.js --standalone bbone  | uglifyjs -o ./dist/bbone.js  -b indent-level=2

# uglifyjs ./dist/vent.js -o ./dist/vent.js -b indent-level=2
# uglifyjs ./dist/bbone.js -o ./dist/bbone.js -b indent-level=2

# uglifyjs ./dist/vent.js -o ./dist/vent.min.js --screw-ie8 -c
# uglifyjs ./dist/bbone.js -o ./dist/bbone.min.js --screw-ie8 -c

# var fs = require('fs')
# var head = '(function(f){ if(typeof exports=="object"&&typeof module!="undefined"){module.exports=f();}else if(typeof define=="function"){define([],f)}else{this.bbone=f();} })(function(){var define,module,exports; return function e(t,n,r){ function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module "+o)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({'
# var rgx = /([\s\S]+)(\s+1: \[ function\(require, module, exports\) \{)/
# var file = './dist/bbone.js'
# fs.writeFileSync(file, fs.readFileSync(file).toString().replace(rgx, head+'\n  $2'))