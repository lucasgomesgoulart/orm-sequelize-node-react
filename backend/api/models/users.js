'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      this.belongsTo(models.Admins, { foreignKey: 'admin_id' });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    adm_user: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};