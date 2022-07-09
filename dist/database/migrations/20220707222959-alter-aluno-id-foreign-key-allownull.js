"use strict";module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('images', 'aluno_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'alunos',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: () => {},
};
