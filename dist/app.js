"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _path = require('path');

var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _aluno = require('./routes/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _upload = require('./routes/upload'); var _upload2 = _interopRequireDefault(_upload);
var _loginRequired = require('./middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

require('./database');

_dotenv2.default.config();

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/aluno/', _loginRequired2.default, _aluno2.default);
    this.app.use('/upload/', _loginRequired2.default, _upload2.default);

    this.app.use('/token/', _token2.default);
  }
}

exports. default = new App().app;
