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
        console.log("-----------------------------".verbose);
        console.log("      Welcome To Bamazon    ".silly);
        console.log("-----------------------------".verbose);
        console.log("");
        console.log("Find below our Products List".verbose);
        console.log("");

        var table = new Table({
            head: ['Product ID#', 'Product Description', 'Price'],
            colWidths: [15, 23, 15]

        });

        for (var i = 0; i < results.length; i++) {
            table.push([results[i].item_id, results[i].product_name, results[i].price]);
        }
        console.log(table.toString());
        askTheCustomer()
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
                            console.log("Thank you for your purchase!".silly)
                            console.log("Here is your total: " + totalprice.error);
                            inventory();

                        }
                        // be sure you have enough invertory
                        //if yes you need to sell and upate the inventory

                    );
                } else {
                    console.log("not enough")
                    askthecustomer()
                }
            })





        })



}


//inventory will show all pthe products (id / name / prcie)
//then  you ask for the id and for thequantity   (inquierye)

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.


// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.







// If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.