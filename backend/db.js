const mysql = require("mysql");

var con = mysql.createConnection({
    database: "ACADEMISE",
    host: "localhost",
    user: "root",
    password: ""
})

con.connect(function(err) {
    if(err) throw err;
    console.log("Connected")
})

module.exports = {
    con
}