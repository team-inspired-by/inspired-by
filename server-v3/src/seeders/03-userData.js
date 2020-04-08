"use strict";
const uuidv4 = require("uuid").v4;

module.exports = {
  up: (queryInterface, Sequelize) => {
    // const user = await queryInterface.sequelize.query(`SELECT * from "Users";`);
    return queryInterface.bulkInsert("Users", [{
        id: uuidv4(),
        name: "testVisitor1",
        alias: "testVisitor1",
        email: "TestVisitor1@inspired-by.me",
        level: "VISITOR",
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: "857e76cd-bbb0-4c58-b083-87572341e8eb",
        name: "testVisitor2",
        alias: "testVisitor2",
        email: "testVisitor2@inspired-by.me",
        level: "VISITOR",
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: "63b54c93-635b-42ef-bc83-388debf6fa64",
        name: "testWriter",
        alias: "testWriter",
        email: "testWriter1@inspired-by.me",
        level: "WRITER",
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: "f39ddcaf-c0cb-475b-a7a7-fa2dcba9c473",
        email: "testUser@inspired-by.me",
        subscribeEmail: false,
        name: "testUser",
        alias: "testUser",
        alias: "testU",
        level: "MANAGER",
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", [{
      email: "TestVisitor1@inspired-by.me"
    }, {
      email: "testVisitor2@inspired-by.me"
    }, {
      email: "testWriter1@inspired-by.me"
    }, {
      email: "testUser@inspired-by.me"
    }]);
  }
};