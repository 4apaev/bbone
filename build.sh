#!/bin/bash

browserify -t babelify ./src/vent.js | uglifyjs -o ./dist/vent.js  -b indent-level=2
browserify -t babelify ./bbone.js --standalone bbone  | uglifyjs -o ./dist/bbone.js  -b indent-level=2

# browserify ./src/vent.js | uglifyjs -o ./dist/vent.js  -b indent-level=2
# browserify ./bbone.js --standalone bbone  | uglifyjs -o ./dist/bbone.js  -b indent-level=2

# uglifyjs ./dist/vent.js -o ./dist/vent.js -b indent-level=2
# uglifyjs ./dist/bbone.js -o ./dist/bbone.js -b indent-level=2

# uglifyjs ./dist/vent.js -o ./dist/vent.min.js --screw-ie8 -c
# uglifyjs ./dist/bbone.js -o ./dist/bbone.min.js --screw-ie8 -c

uglifyjs ./dist/*.js -o ./dist/bbone.min.js --screw-ie8 -c

