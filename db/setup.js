// const mysql = require('mysql');
//
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'dbuser',
//     port: parseInt(process.env.DB_PORT || 3306),
//     password: process.env.DB_PASSWD || 'dbpassword',
//     database: process.env.DB_NAME || 'dbname',
//     debug: process.env.STAGE === 'development'
// })
// console.log(connection);
// const getDbConn = () => connection.connect((error) => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
// });
//
// const runQuery = async function (sql, values, callback) {
//     let conn = await getDbConn();
//     return await conn.query(sql, values, callback).then(() => conn.disconnect());
// }
// const endConnection = function () {
//     if (connection._connectCalled) {
//         connection.end();
//     }
// }


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'dbname',
    process.env.DB_USER || 'dbuser',
    process.env.DB_PASSWD || 'dbpassword',
    {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || 3306),
        dialect: 'mariadb',
        logQueryParameters: process.env.STAGE = 'development'
    }
);


module.exports = sequelize;
