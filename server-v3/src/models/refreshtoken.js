'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userAlias: {
      allowNull: false,
      type: DataTypes.STRING
    },
    expiredIn: {
      allowNull: false,
      type: DataTypes.DATE
    },
    issuedAccessToken: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  RefreshToken.associate = function (models) {
    // associations can be defined here
  };
  return RefreshToken;
};