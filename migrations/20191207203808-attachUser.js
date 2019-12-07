'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Crawls', 'owner', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Crawls', 'owner')
  }
};
