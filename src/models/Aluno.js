import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(sequelize)({
      firstName: Sequelize.String,
      lastName: Sequelize.String,
      email: Sequelize.String,
      age: Sequelize.Integer,
      height: Sequelize.FLOAT,
      weight: Sequelize.FLOAT,
    }, {
      sequelize,
    });
    return this;
  }
}
