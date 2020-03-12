'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SeriesPosts', {
      SeriesId: {
        type: Sequelize.STRING,
      },
      PostId: {
        type: Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SeriesPosts');
  }
};