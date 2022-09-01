const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/setup')
const Employer = require('Employer')


const Role = db.define('Role', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.STRING,
        get () {
            return this.getDataValue('permissions').split(';');
        },
        set (value) {
            this.setDataValue('permissions', value.join(';'));
        }
    }
}, {
    tableName: 'roles'
});

Role.hasMany(Employer);

module.exports = Role;