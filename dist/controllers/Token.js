"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    if (!req.body) {
      return res.status(404).send({ message: 'Error creating  token' });
    }

    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: 'No email or password provided' });
    }

    const user = await _User2.default.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!(await user.passwordIsValid(password))) return res.status(404).send({ message: 'Password is invalid' });

    const { id } = user;
    const token = _jsonwebtoken2.default.sign({ email, id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ message: 'Token gerado com sucesso', token });
  }
}

exports. default = new TokenController();
