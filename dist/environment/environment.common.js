"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var env = process.env.NODE_ENV;
if (!env) console.warn('process.env.NODE_ENV has not been set');
var mode = {
  env: env,
  mock: env === 'mock',
  local: env === 'local',
  development: env === 'development',
  staging: env === 'staging',
  production: env === 'production'
};
var _default = {
  env: env,
  mode: mode
};
exports.default = _default;