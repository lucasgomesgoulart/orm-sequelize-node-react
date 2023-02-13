'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {

    static associate(models) {
      this.belongsTo(models.Admins, { foreignKey: 'admin_id' })
    }
  }
  Logs.init({
    description: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Logs',
  });
  return Logs;
};