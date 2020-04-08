'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    openId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isPrimaryId: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    linkedId: {
      allowNull: true,
      type: DataTypes.STRING
    },
    accessToken: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userType: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isStashed: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // stasher: {
    //   allowNull: true,
    //   type: model
    // }
    stashedDate: {
      allowNull: true,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    subscribeEmail: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    alias: {
      allowNull: true,
      type: DataTypes.STRING
    },
    profileImage: {
      allowNull: true,
      type: DataTypes.STRING
    },
    profileMessage: {
      allowNull: true,
      type: DataTypes.STRING
    },
    initialLetter: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isHeavyUser: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    level: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "VISITOR"
    },
    // writtenPostId: {
    //   allowNull: true,
    //   type: DataTypes.STRING,
    // },
    // writtenPosts: 
    // scrappedPosts: 
    // comments:
    // contributions
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});
  User.associate = function (models) {
    // User.belongsTo(models.Post, {
    //   onDelete: 'SET NULL',
    //   onUpdate: 'NO ACTION',
    //   as: 'owner'
    //   // foreignKey: "owner",
    //   // targetKey: ""
    // })
    // User.hasOne(models.User)
    User.hasMany(models.Post, {
      sourceKey: "id",
      foreignKey: "ownerId",
      as: "writtenPosts"
    })
  };
  return User;
};