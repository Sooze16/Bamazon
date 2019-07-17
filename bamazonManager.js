var mysql = require("mysql")
var inquirer = require("inquirer")
var colors = require('colors')
var Table = require('cli-table')

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "Sooze16",
    password: "Gidget@Kramer",
    database: "bamazon_db"
})



connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadID + "\n");
    inventory();
})

var inventory = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id, results[i].product_name, results[i].price)
        }

        askTheManager()
    })
}

var askTheManager = function() {

    inquirer
        .prompt([{
                name: "item_id",
                type: "input",
                message: "What is the item you would like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }

        ])
        .then(function(data) {
            console.log(data)
            var inputid = parseInt(data.item_id)
            connection.query("SELECT * FROM products where item_id=" + inputid, function(err, results) {


                if (err) throw err;
                console.log(results)


                if (results[0].stock_quantity >= parseInt(data.quantity)) {
                    console.log(data.quantity)
                    var newQ = results[0].stock_quantity - parseInt(data.quantity)
                    console.log("newq:", newQ)
                    var totalprice = results[0].price * parseInt(data.quantity)
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQ
                            },
                            {
                                item_id: inputid
                            }
                        ],
                        function(error) {
                            // if (error) throw err;
                            console.log(error)
                            console.log("Thank you for your purchase!", totalprice);
                            inventory();

                        }

                    );
                } else {
                    console.log("not enough")
                    askTheManager()
                }
            })





        })



}