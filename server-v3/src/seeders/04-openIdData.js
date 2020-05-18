'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("OpenIds", [{
      id: "d7d82be7-c99e-4a85-bdf0-b37f0188f68e",
      idType: "ADMIN",
      openId: "default",
      linkedUserId: "f39ddcaf-c0cb-475b-a7a7-fa2dcba9c473",
      memo: "This account is and initial administrator account. should be deleted after starting a service",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OpenIds', [{
      id: "d7d82be7-c99e-4a85-bdf0-b37f0188f68e"
    }], {})
  }
};