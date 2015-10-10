module.exports = use
function use(ctx, src, name) {
    ctx[name] = function() {
        return src[name].apply(ctx, arguments);
      }
  }
