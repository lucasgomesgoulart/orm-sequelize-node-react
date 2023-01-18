'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admins extends Model {

        static associate(models) {
            this.hasMany(models.Users,{foreignKey:'admin_id'});
        }
    }
    Admins.init({
        admin_username: DataTypes.STRING,
        admin_password: DataTypes.STRING,
        admin_email: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Admins',
    });
    return Admins;
};