"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        username: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [5, 50],
              msg: 'Username length must be greater than 10 and less than 50 characters',
            },
          },
        },

        email: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Invalid email address',
            },
          },
        },

        passwordHash: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
        },

        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 15],
              msg: 'Password length must be between 6 and 15 characters',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.passwordHash = await _bcryptjs2.default.hash(user.password, 10);
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.passwordHash);
  }
} exports.default = User;
