function moc(name, evt, res, val) {
    let func = Function.apply.bind([][name]);
    return function() {
      this.emit(evt, (val =func(this, arguments)));
      return res ? val : this;
    }}
module.exports = moc;