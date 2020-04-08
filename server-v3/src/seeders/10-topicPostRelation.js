'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PostsTopics", [{
      postTitle: "Welcome-to-Inspired-by-blog",
      topicName: "ROS",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      postTitle: "Welcome-to-Inspired-by-blog",
      topicName: "Philosophy",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      postTitle: "Welcome-to-Inspired-by-blog",
      topicName: "Indonesian",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      postTitle: "Welcome-to-Inspired-by-blog",
      topicName: "English",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      postTitle: "This-is-a-seeded-post",
      topicName: "OpenCV",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      postTitle: "This-is-a-seeded-post",
      topicName: "ROS",
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PostsTopics", [{
      postTitle: "This-is-a-seeded-post"
    }, {
      postTitle: "Welcome-to-Inspired-by-blog"
    }])
  }
};