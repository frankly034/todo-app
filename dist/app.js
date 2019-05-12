"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hostname = '127.0.0.1';
var port = process.env.PORT || 3000;
var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('*', function (req, res) {
  res.status(200).send({
    message: 'Welcome to default TodoApp API route'
  });
});
server.listen(port, hostname, function () {
  console.log("server running at http://".concat(hostname, ":").concat(port));
});