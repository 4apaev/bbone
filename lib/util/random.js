var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function int(min, max) {
    return max!=null ? (0|Math.random()*(max-min+1))+min : randomInt(0, min);
  }

function guid(n, prefix) {
  for (var uid=prefix||'', i = 0; i < n; i++)
    uid +=chars[(0|Math.random()*chars.length)];
  return uid;
}

module.exports.int = int
module.exports.guid = guid