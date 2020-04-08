'use strict';

module.exports = function (sequelize, DataTypes) {
  var Contribution = sequelize.define('Contribution', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    linkedPostTitle: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contributorName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contributorId: {
      allowNull: true,
      type: DataTypes.UUID
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});

  Contribution.associate = function (models) {
    Contribution.belongsTo(models.User, {
      as: "contributor",
      foreignKey: "contributorId"
    });
  };

  return Contribution;
};