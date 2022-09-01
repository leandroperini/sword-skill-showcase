const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/setup')
const Role = require('Role')

 const Employer = db.define('Employer', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    respondsTo: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    tableName: 'employers'
});
Employer.belongsTo(Role);
Employer.belongsTo(Employer, {foreignKey:'respondsTo', as: 'Manager'});
module.exports = Employer;