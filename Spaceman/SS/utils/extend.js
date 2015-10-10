(function () {
  "use strict";

  Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
  };

  Function.prototype.extend = function (members) {
    members = members || {};
    var base = this.prototype;

    Object.getOwnPropertyNames(members).forEach(function (prop) {
      var desc = Object.getOwnPropertyDescriptor(members, prop);

      if (desc.get !== undefined) {
        base.__defineGetter__(prop, desc.get);
      } else {
        base[prop] = members[prop];
      }

      if (desc.set !== undefined) {
        base.__defineSetter__(prop, desc.set);
      }
    });

    return this;
  };

  Function.prototype.inherits = function (parent) {
    this.prototype = Object.create(parent.prototype);
    var d = {},
        p = this.prototype;
    this.prototype.constructor = parent;
    this.method('uber', function uber(name) {
      if (!(name in d)) {
        d[name] = 0;
      }
      var f, r, t = d[name], v = parent.prototype;
      if (t) {
        while (t) {
          v = v.constructor.prototype;
          t -= 1;
        }
        f = v[name];
      } else {
        f = p[name];
        if (f == this[name]) {
          f = v[name];
        }
      }
      d[name] += 1;
      r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
      d[name] -= 1;
      return r;
    });
    return this;
  };
}());
