// Challenge #1: Customer View (Minimum Requirement)

var mysql = require("mysql")
var inquirer = require("inquirer")

var Table = require('cli-table')



var colors = require('colors')
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
        // for (var i = 0; i < results.length; i++) {
        //     console.log(results[i].item_id, results[i].product_name, results[i].price)
        // }
        console.log("--------------------------------------------------".verbose);
        console.log("               Welcome To Bamazon    ".silly);
        console.log("--------------------------------------------------".verbose);
        console.log("");
        console.log("           Health and Beauty Department".verbose);
        console.log("");

        var table = new Table({
            head: ['Product ID#', 'Product Description', 'Price'],
            colWidths: [15, 23, 10]

        });

        for (var i = 0; i < results.length; i++) {
            table.push([
                results[i].item_id,
                results[i].product_name,
                results[i].price
            ]);
        }
        console.log(table.toString());
        askTheCustomer()
    })
}


function goAgain() {
    inquirer
        .prompt([{

            name: "userAnswer",
            type: "confirm",
            message: "Would you like to continue?"
        }]).then(function(answer) {
            if (answer.userAnswer) {
                inventory()
            } else {
                connection.end()
                console.log("Thank you for shopping with us!".silly);

                process.exit()
            }
            // console.log('TEST', answer.userAnswer)
        })
}


var askTheCustomer = function() {

    inquirer
        .prompt([{
                name: "item_id",
                type: "input",
                message: "Please enter Product ID# of the item you would like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n" + "Please enter a number".error)
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you wish to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {

                        return true;

                    }
                    console.log("\n" + "Please enter a number".error)
                    return false;


                }
            }
        ])
        .then(function(data) {
            // console.log(data)
            var inputId = parseInt(data.item_id)
            connection.query("SELECT * FROM products WHERE item_id=" + inputId, function(err, results) {


                if (err) throw err;
                // console.log(results)


                if (results[0].stock_quantity >= parseInt(data.quantity)) {
                    // console.log(data.quantity)
                    var newQ = results[0].stock_quantity - parseInt(data.quantity)
                    console.log("Current Stock: ".debug, newQ)
                    var totalPrice = results[0].price * parseInt(data.quantity)
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newQ
                            },
                            {
                                item_id: inputId
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            // console.log(error)
                            console.log("Thank you for your purchase!".silly)
                            console.log("Purchase total: ".info + "$" + totalPrice);
                            goAgain()
                                // orderMore();
                                // end 

                        }
                        // be sure you have enough invertory
                        //if yes you need to sell and upate the inventory

                    );
                } else {
                    console.log("We do not have sufficient inventory. There are ".warn + results[0].stock_quantity + " units in stock.".warn)

                    goAgain()
                        // process.exit()
                }

            })
        })
}