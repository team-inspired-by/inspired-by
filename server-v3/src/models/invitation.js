'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    levelTo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deprecatedAt: {
      allowNull: false,
      type: DataTypes.DATE
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
  Invitation.associate = function (models) {
    // associations can be defined here
  };
  return Invitation;
};