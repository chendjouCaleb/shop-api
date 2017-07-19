var mysql       = require("mysql");
var credentials = require('./credentials');
var connection  = mysql.createConnection({
    host:       '127.0.0.1',
    user:       credentials.database.username,
    password:   credentials.database.password,
    database:   credentials.database.databaseName
});
connection.connect();

module.exports = connection;