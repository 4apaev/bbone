module.exports = defines;
function defines(obj, str, fnc) {
  var arr = str.split(':'),
      name = arr.pop(),
      prop = arr.pop() || 'value',
      hex = (arr.pop() || '101').split(''),
      desc = { configurable: !!+hex[0], enumerable: !!+hex[1]};
  if('value' === prop && !!+hex[2])
    desc.writable = true;
  desc[prop] = fnc;
  Object.defineProperty(obj, name, desc)
  return obj;
}
defines(defines, 'value:alias', (src, name, nikname)=>{
  var desc = Object.getOwnPropertyDescriptor(src, name);
  desc && Object.defineProperty(src, nikname, desc);
})
