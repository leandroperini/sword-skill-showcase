const { DataTypes } = require("sequelize");
const db = require("../db/setup");
const Employer = require("./Employer");

const Task = db.define(
  "Task",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
    employerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Employer,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tasks",
    updatedAt: false,
  }
);

Task.belongsTo(Employer);

module.exports = Task;
