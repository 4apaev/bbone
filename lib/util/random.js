module.exports.int = randomInt;

function randomInt(min, max) {
    return max!=null ? (0|Math.random()*(max-min+1))+min : randomInt(0, min);
  }

module.exports.str = randomStr;
function randomStr() {
    return Math.random().toString(36).slice(2);
  }