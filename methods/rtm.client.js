'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = client;

var _rtm = require('./rtm.start');

var _rtm2 = _interopRequireDefault(_rtm);

var _rtm3 = require('./rtm.events');

var _rtm4 = _interopRequireDefault(_rtm3);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// socket factory
function client() {

  // build a new bot every time
  var bot = {
    handlers: {
      started: []
    }
  };

  // generate event handler registration methods
  _rtm4.default.forEach(function (e) {
    bot.handlers[e] = [];
    bot[e] = function (handler) {
      bot.handlers[e].push(handler);
    };
  });

  bot.started = function (handler) {
    bot.handlers['started'].push(handler);
  };

  // kicks up a web socket connection
  bot.listen = function botListen(params) {
    (0, _rtm2.default)(params, function (err, data) {
      // grab a handle on the socket
      bot.ws = new _ws2.default(data.url);
      // delegate everything
      bot.ws.on('message', function message(data, flags) {
        var json = JSON.parse(data);
        var handlers = bot.handlers[json.type] || [];
        handlers.forEach(function (m) {
          return m.call({}, json);
        });
      });
      // call started callbacks
      bot.handlers['started'].forEach(function (m) {
        return m.call({}, data);
      });
    });
  };

  // closes the socket
  bot.close = function botClose() {
    bot.ws.close();
  };

  //////////
  return bot;
}
module.exports = exports['default'];