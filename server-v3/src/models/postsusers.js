'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostsUsers = sequelize.define('PostsUsers', {
    postTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Posts',
        key: 'title'
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {});
  PostsUsers.associate = function (models) {
    // associations can be defined here
  };
  return PostsUsers;
};