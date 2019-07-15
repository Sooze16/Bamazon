var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Sooze16",
    password: "Gidget@Kramer",
    database: "bamazon_db"
})

connection.connect(function(err) {
    console.log("Connected as ide: " + connection.threadID);
})

var start = function() {
    inquirer.prompt({


    })


}