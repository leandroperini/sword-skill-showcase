const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "dbname",
  process.env.DB_USER || "dbuser",
  process.env.DB_PASSWD || "dbpassword",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logQueryParameters: (process.env.STAGE = "development"),
  }
);

module.exports = sequelize;
