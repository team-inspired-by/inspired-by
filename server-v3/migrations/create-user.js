"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      openId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isPrimaryId: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      linkedId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      accessToken: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isStashed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // stasher: {
      //   allowNull: true,
      //   type: model
      // }
      stashedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subscribeEmail: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      alias: {
        allowNull: true,
        type: Sequelize.STRING
      },
      profileImg: {
        allowNull: true,
        type: Sequelize.STRING
      },
      initialLetter: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isHeavyUser: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      level: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "VISITOR"
      },
      writtenPostId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      // writtenPosts:
      // scrappedPosts:
      // comments:
      // contributions
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
