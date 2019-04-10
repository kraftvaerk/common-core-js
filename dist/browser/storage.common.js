"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.session = exports.local = void 0;

var _utility = require("../utility/utility.common");

var type = {
  local: 'localStorage',
  session: 'sessionStorage'
};
var core = {
  get: function get(type, id, def
  /* default value */
  ) {
    var result = self[type].getItem(id);
    return (0, _utility.parseJSON)(result) || def;
  },
  set: function set(type, id, value) {
    var result = (0, _utility.stringify)(value);
    self[type].setItem(id, result);
  },
  del: function del(type, id) {
    self[type].removeItem(id);
  }
};
var local = {
  get: function get(id, def
  /* default value */
  ) {
    return core.get(type.local, id, def);
  },
  set: function set(id, value) {
    core.set(type.local, id, value);
  },
  del: function del(id) {
    core.del(type.local, id);
  }
};
exports.local = local;
var session = {
  get: function get(id, def
  /* default value */
  ) {
    return core.get(type.session, id, def);
  },
  set: function set(id, value) {
    core.set(type.session, id, value);
  },
  del: function del(id) {
    core.del(type.session, id);
  }
};
exports.session = session;
var _default = {
  local: local,
  session: session
};
exports.default = _default;