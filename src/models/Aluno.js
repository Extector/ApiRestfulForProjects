import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.INTEGER,
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
          type: Sequelize.INTEGER,
          required: true,
          validate: {
            isInt: {
              msg: 'The age must be an integer',
            },
          },
        },

        height: {
          type: Sequelize.FLOAT,
          required: false,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'The height must be an float',
            },
          },
        },

        weight: {
          type: Sequelize.FLOAT,
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
}
