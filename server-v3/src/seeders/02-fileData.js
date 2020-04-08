'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Files", [{
      id: "e0180067-bca0-4a69-a689-abd262bc2721",
      uploaderId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      alias: "pretty-rose",
      fileType: "EXT_IMG",
      url: "https://picsum.photos/200/300?grayscale",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "1a5139d8-4733-4308-a2b3-f7de7be0a444",
      uploaderId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      alias: "white-snow",
      fileType: "EXT_IMG",
      url: "https://picsum.photos/200/300?grayscale",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "dbfa664e-81d1-4d68-8c67-4ad187be4681",
      uploaderId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      alias: "cheese-cake",
      fileType: "EXT_IMG",
      url: "https://picsum.photos/200/300?grayscale",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "7fc121d7-5459-4413-b196-7492b8191d51",
      uploaderId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      alias: "red-candy",
      fileType: "EXT_IMG",
      url: "https://picsum.photos/200/300?grayscale",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "2bc7c19d-290b-462d-b634-6a3f6bf45cd9",
      uploaderId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      alias: "oragne-shoes",
      fileType: "EXT_IMG",
      url: "https://picsum.photos/200/300?grayscale",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Files", [{
      url: "https://picsum.photos/200/300?grayscale"
    }])
  }
};