'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users',
      'firstName',
      {
        type: Sequelize.STRING,
        allowNull: false
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName');
  }
};
