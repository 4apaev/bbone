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




function shuffle(arr) {
  var u, t, r, i = -1;
  while(u!=(t=arr[++i])) {
    arr[i] = arr[r=0|Math.random()*i];
    arr[r] = t;
  }
  return arr;
}




function exchange(arr) {


  return arr;
}