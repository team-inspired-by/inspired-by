'use strict';
module.exports = (sequelize, DataTypes) => {
  const OpenId = sequelize.define('OpenId', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    idType: {
      allowNull: false,
      type: DataTypes.STRING
    },
    openId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    accessToken: {
      allowNull: true,
      type: DataTypes.STRING
    },
    linkedUserId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    memo: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  OpenId.associate = function (models) {};
  return OpenId;
};