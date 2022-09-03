const { DataTypes } = require("sequelize");
const db = require("../db/setup");
const Role = require("./Role/Role");

const Employer = db.define(
  "Employer",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respondsTo: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: this,
        key: "id",
      },
      allowNull: true,
      set(value) {
        if (value && value instanceof Employer) {
          return this.setDataValue("respondsTo", value.id);
        }
        this.setDataValue("respondsTo", value);
      },
    },
    role: {
      type: DataTypes.BIGINT.UNSIGNED,
      field: "roleId",
      references: {
        model: Role,
        key: "id",
      },
      set(value) {
        if (value && value instanceof Role) {
          return this.setDataValue("role", value.id);
        }
        this.setDataValue("role", value);
      },
    },
  },
  {
    tableName: "employers",
    timestamps: false,
  }
);

Employer.belongsTo(Employer, { foreignKey: "respondsTo", as: "Manager" });
Employer.belongsTo(Role, { as: "Role" });

module.exports = Employer;
