const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/setup')
const Role = require('Role')

const Task = db.define('Task', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    summary: {
        type: DataTypes.STRING(2500),
        allowNull: false
    },
    employer_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Employer,
            key: 'id'
        }
    },
    created_at: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'tasks'
});

Task.belongsTo(Role);

module.exports = Task;