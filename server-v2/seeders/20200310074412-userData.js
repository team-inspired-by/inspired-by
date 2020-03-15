"use strict";
const uuidv4 = require("uuid").v4;

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const user = await queryInterface.sequelize.query(`SELECT * from "Users";`);
    return queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        openId: "12345",
        accessToken: "access1234",
        userType: "GOOGLE",
        email: "kjhricky@gmail.com",
        createdAt: Sequelize.fn("NOW"),
        updatedAt: Sequelize.fn("NOW")
      },
      {
        id: uuidv4(),
        openId: "22222",
        accessToken: "121212",
        userType: "GOOGLE",
        email: "100kimch@naver.com",
        createdAt: Sequelize.fn("NOW"),
        updatedAt: Sequelize.fn("NOW")
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", [
      {
        openId: "12345"
      }
    ]);
  }
};
