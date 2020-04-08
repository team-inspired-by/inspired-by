'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GeneralPosts", [{
      title: "Welcome-to-Inspired-by-blog",
      lastContentId: "bda8d280-40f4-4b69-a0dd-6f456bf4bf93"
    }, {
      title: "This-is-a-seeded-post",
      lastContentId: "f31ca834-61b1-4352-a36d-57662f10e3d4"
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelets("GeneralPosts", [{
      title: "Welcome-to-Inspired-by-blog"
    }, {
      title: "This-is-a-seeded-post"
    }])
  }
};