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
    linkedUserId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    memo: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  OpenId.associate = function (models) {
    OpenId.belongsTo(models.User, {
      as: "user",
      foreignKey: "linkedUserId"
    });
  };
  return OpenId;
};