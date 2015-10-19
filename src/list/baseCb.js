function makeCb(x) {
  switch(typeof x){
    case 'function': return x;
    case 'string': return (o => o===''+o ? x===o: x in o); break;
    case 'number': return (o => o===+o ? x===o : x in o); break;
    case 'object':
      let ks = Object.keys(x);
      return o => ks.every(k => k in o && x[k]===o[k]); break;
    default: return (o => o===x);
  }
}

module.exports = makeCb;