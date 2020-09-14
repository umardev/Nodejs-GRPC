const mysql = require("mysql");
const { DB_HOST2, DB_USER2, DB_PASSWORD2, DB_DATABASE2 } = require("./constants");
const util = require('util')

var dbConnectionInfo = {
    host: DB_HOST2,
    user: DB_USER2,
    password: DB_PASSWORD2,
    database: DB_DATABASE2,
};

var dbConnection = mysql.createConnection(dbConnectionInfo);

dbConnection.on(
    "connect",
    function () {
        console.log("@connected to db 2");
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
