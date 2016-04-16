'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = starsadd;

var _exec = require('./_exec');

var _exec2 = _interopRequireDefault(_exec);

var _validate = require('./_validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this file was generated by ./scripts/generate-web-api
function starsadd(params, callback) {
  var ns = 'stars.add';
  var err = (0, _validate2.default)(ns, params);
  if (err) {
    callback(err);
  } else {
    (0, _exec2.default)(ns, params, callback);
  }
}
module.exports = exports['default'];