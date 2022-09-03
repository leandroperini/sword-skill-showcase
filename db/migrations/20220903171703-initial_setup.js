"use strict";

module.exports = {
  async up({ context: queryInterface }) {
    return await queryInterface.sequelize.transaction(async (t) => {
      return await Promise.all([
        () => console.log("ISAEDFIUWEBFOWFWIEFIWOEFB"),
        () => console.log(process.env),
        await queryInterface.sequelize.createSchema(process.env.DB_NAME),
        await queryInterface.createTable(
          "roles",
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
            },
          },
          { transaction: t }
        ),
        await queryInterface.createTable(
          "tasks",
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
          { transaction: t }
        ),
        await queryInterface.createTable(
          "employers",
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
              allowNull: false,
            },
            roleId: {
              type: DataTypes.BIGINT.UNSIGNED,
              references: {
                model: Role,
                key: "id",
              },
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down({ context: queryInterface }) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("tasks", { transaction: t }),
        queryInterface.dropTable("employers", { transaction: t }),
        queryInterface.dropTable("roles", { transaction: t }),
        queryInterface.sequelize.dropDatabase(process.env.DB_NAME),
      ]);
    });
  },
};
