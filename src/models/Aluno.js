import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.INTEGER,
      height: Sequelize.FLOAT,
      weight: Sequelize.FLOAT,
    }, {
      sequelize,
    });
    return this;
  }
}
