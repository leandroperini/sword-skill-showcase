const { DataTypes } = require("sequelize");
const db = require("../../db/setup");
const Permissions = require("./Permissions");

const Role = db.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    permissions: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        permissionExists(value) {
          Permissions.validateString(value);
        },
      },
      get() {
        return this.getDataValue("permissions").split(";");
      },
      set(value) {
        const permissionsString = value.join(";");
        Permissions.validateString(permissionsString);
        this.setDataValue("permissions", permissionsString);
      },
      add(value) {
        Permissions.validate(value);
        this.setDataValue(this.getDataValue("permissions") + ";" + value);
      },
      toString() {
        return this.getDataValue("permissions");
      },
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
