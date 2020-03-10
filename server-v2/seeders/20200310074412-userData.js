"use strict";
const uuidv4 = require('uuid').v4

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    // const user = await queryInterface.sequelize.query(`SELECT * from "Users";`);
    return queryInterface.bulkInsert("Users", [{
      id: uuidv4(),
      openId: "12345",
      accessToken: "access1234",
      userType: "GOOGLE",
      email: "kjhricky@gmail.com",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: uuidv4(),
      openId: "22222",
      accessToken: "121212",
      userType: "GOOGLE",
      email: "100kimch@naver.com",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Users", [{
      openId: "12345"
    }]);
  }
};