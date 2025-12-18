'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'scheduled_start', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('tasks', 'scheduled_end', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('tasks', 'scheduled_start');
    await queryInterface.removeColumn('tasks', 'scheduled_end');
  },
};
