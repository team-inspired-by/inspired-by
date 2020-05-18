'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [{
      id: "be113615-bf1d-498d-a4f8-6976bfdda392",
      linkedPostTitle: "Welcome-to-Inspired-by-blog",
      content: "Nice to see you",
      authorId: "857e76cd-bbb0-4c58-b083-87572341e8eb",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "9eab68f8-9889-492b-a25f-1e0c69961d58",
      linkedPostTitle: "Welcome-to-Inspired-by-blog",
      content: "Well, pretty good.",
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "b4675fe9-a5ef-4749-8992-fd7bef08a0b4",
      linkedPostTitle: "Welcome-to-Inspired-by-blog",
      content: "Hi, I'm manager of inspired-by website.",
      authorId: "f39ddcaf-c0cb-475b-a7a7-fa2dcba9c473",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "0f3c53e2-04f9-4a02-a706-ed04fe1edee3",
      linkedPostTitle: "This-is-a-seeded-post",
      content: "Is there any comment here?",
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: "dc4d6df1-fa01-4105-b4d1-9922449e40a7",
      linkedPostTitle: "This-is-a-seeded-post",
      content: "Nada. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum.",
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Contents", [{
      authorId: "63b54c93-635b-42ef-bc83-388debf6fa64"
    }, {
      authorId: "857e76cd-bbb0-4c58-b083-87572341e8eb"
    }, {
      authorId: "f39ddcaf-c0cb-475b-a7a7-fa2dcba9c473"
    }])
  }
};