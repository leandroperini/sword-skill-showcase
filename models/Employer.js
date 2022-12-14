const { DataTypes } = require("sequelize");
const db = require("../db/setup");
const Role = require("./Role/Role");
const { getTokenByEmployer } = require("../middlewares/RequireAuth");

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
    },
    roleId: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: Role,
        key: "id",
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return getTokenByEmployer(this.id + this.name);
      },
      set(value) {},
    },
  },
  {
    tableName: "employers",
    timestamps: false,
  }
);

Employer.hasMany(Employer, { foreignKey: "respondsTo", as: "supervised" });
Employer.belongsTo(Employer, { foreignKey: "id", as: "manager" });
Employer.belongsTo(Role, { foreignKey: "id", as: "role" });

module.exports = Employer;
