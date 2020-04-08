'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostsTopics = sequelize.define('PostsTopics', {
    postTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Posts',
        key: 'title'
      }
    },
    topicName: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Topics',
        key: 'name'
      }
    },
  }, {});
  PostsTopics.associate = function (models) {
    // associations can be defined here
  };
  return PostsTopics;
};