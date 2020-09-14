const mysql = require("mysql");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = require("./constants");
const util = require('util')

var dbConnectionInfo = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

var dbConnection = mysql.createConnection(dbConnectionInfo);

dbConnection.on(
    "connect",
    function () {
        console.log("@connected to db");
    },
    "end",
    function (err) {
        console.log("@end ", err);
        throw err;
    },
    "close",
    function (err) {
        console.log("@closed ", err);
        throw err;
    }
);

dbConnection.query = util.promisify(dbConnection.query)


module.exports = dbConnection;
