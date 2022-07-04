import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [5, 50],
              msg: 'Username length must be greater than 10 and less than 50 characters',
            },
          },
        },

        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Invalid email address',
            },
          },
        },

        passwordHash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },

        password: {
          type: Sequelize.VIRTUAL,
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
      if (user.password) user.passwordHash = await bcryptjs.hash(user.password, 10);
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.passwordHash);
  }
}
