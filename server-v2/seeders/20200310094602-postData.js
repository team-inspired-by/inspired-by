'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const owner = await queryInterface.sequelize.query(
      `SELECT id from "Users"`
    );
    return queryInterface.bulkInsert("Posts", [{
      title: Math.random().toString(),
      contents: "testing post",
      ownerId: owner[0].id,
      // ownerId: "73ee9baf-27d2-4677-923d-8e159048925a",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      title: Math.random().toString(),
      contents: "testing post",
      ownerId: owner[0].id,
      // ownerId: "73ee9baf-27d2-4677-923d-8e159048925a",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", [{
      contents: "testing post"
    }]);
  }
};