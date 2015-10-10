var fs = require('fs')
var base = read('./src/vent.js')
var vent = read('./src/base.js')

function read(name) {
  return fs.readFileSync(name).toString()
                              .replace(/\/\/.*/g, '')
                              // .replace(/module.exports.*/g, '')
                              // .replace(/.*require.*/g, '')
                              .replace(/\n+/g, '\n')
                              .split(/\n/)
                              .filter(x => !!x.trim())
                              .map(x => '    '+x)
                              .join('\n')
}

fs.writeFileSync('./dist/main.js', [
  '!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module "+o)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({',
  '  1: [ function(require, module, exports) {',
  read('./src/base.js'),
  '  }, {} ],',
  '  2: [ function(require, module, exports) {',
  read('./src/vent.js'),
  '  }, {"./base": 1} ]',
  '},{},[2]);',
].join('\n'))

// fs.writeFileSync('./dist/main.js', [
//   ";(function() {",
//   read('./src/base.js'),
//   read('./src/vent.js'),
//   "  if(typeof exports=='object'&&typeof module!='undefined'){module.exports=Vent;}else if(typeof define=='function'){define([],function(){return Vent})}else{this.Vent=Vent;}",
//   "}.call(this))"
// ].join('\n'))

// while(match=body.match(rgx)
//   deps.push(match[1])



  // Vent.use('once', function(type, fx, ctx) {
  //     this.on(type, function() {
  //       fx.apply(ctx, arguments)
  //       this.off(type, arguments.callee);
  //     }, this);
  //     return this;
  //   })


// if(typeof exports=='object'&&typeof module!='undefined'){module.exports=Vent;}else if(typeof define=='function'){define([],function(){return Vent})}else{root.Vent=Vent;}
// browserify src/vent.js -t babelify --standalone Vent | uglifyjs -o dist/vent.js -b -i 2

// brw = 'browserify -t babelify ./src/vent.js'


// ugl=function(a, b) {
//   return `browserify -t babelify ./src/vent.js ${a ? '--standalone Vent ' : ''}| uglifyjs -o ./dist/vent.js ${b ? '-b ' : ''}--screw-ie8 -c`
// }

// [[0,0],[0,1],[1,0],[1,1]].map(function(args) { return args.join(',') + ': ' + ugl.apply(null, args)}).join('\n')

// "build:00": "browserify -t babelify ./src/vent.js | uglifyjs -o ./dist/vent.js --screw-ie8 -c",
// "build:01": "browserify -t babelify ./src/vent.js | uglifyjs -o ./dist/vent.js -b --screw-ie8 -c",
// "build:10": "browserify -t babelify ./src/vent.js --standalone Vent | uglifyjs -o ./dist/vent.js --screw-ie8 -c",
// "build:11": "browserify -t babelify ./src/vent.js --standalone Vent | uglifyjs -o ./dist/vent.js -b --screw-ie8 -c",
// "build": "npm run build:00",

