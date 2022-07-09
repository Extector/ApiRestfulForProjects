"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          required: true,
          validate: {
            len: {
              args: [3, 50],
              message:
                'First name lenght must  be greater than 3 characters long',
            },
          },
        },

        lastName: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          required: false,
          validate: {
            len: {
              args: [0, 50],
              message: 'Last name lenght must be lower than 50 characters long',
            },
          },
        },

        email: {
          type: _sequelize2.default.INTEGER,
          defaultValue: '',
          required: true,
          unique: true,
          validate: {
            isEmail: {
              message: 'Email must be a valid email address',
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          required: true,
          validate: {
            isInt: {
              msg: 'The age must be an integer',
            },
          },
        },

        height: {
          type: _sequelize2.default.FLOAT,
          required: false,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'The height must be an float',
            },
          },
        },

        weight: {
          type: _sequelize2.default.FLOAT,
          required: false,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'The weight must be an float',
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Upload, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
