// Challenge #2: Manager View (Next Level)

var mysql = require("mysql")
var inquirer = require("inquirer")
var colors = require('colors')
var Table = require('cli-table')

colors.setTheme({
    silly: 'rainbow',
    verbose: 'cyan',
    info: 'green',
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

// List a set of menu options:
// View Products for Sale
var inventory = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        console.log("----------------------------------------------------");
        console.log("            Complete Inventory List".debug);
        console.log("----------------------------------------------------");
        console.log("");

        var table = new Table({
            head: ["Product ID#", "Product Description", "Cost", "Stock"],
            colWidths: [10, 20, 10, 8],

        });
        //end Table
        for (var i = 0; i < results.length; i++) {
            table.push([
                results[i].item_id,
                results[i].product_name,
                results[i].price,
                results[i].stock_quantity
            ]);
        }
        console.log(table.toString());
        askTheManager();
    });
}

var askTheManager

inquirer
    .prompt([{
        name: "item_id",
        type: "list",
        choices: ["View Inventory", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"],

        message: "\n" + "Which task are you performing?"
    }])
    .then(function(res) {
        switch (res.menu) {
            case ("Inventory"):
                viewInventory();
                break;

            case ("View Low Inventory"):
                lowInventory();
                break;

            case ("Add To Inventory"):
                addToInventory();
                break;

            case ("Add New Product"):
                newItem();
                break;

            case ("Exit"):
                end();
                break;

        }

    })


// View Low Inventory



// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

function addToInventory() {
    // add (order) user-defined quantity to item_name; then update

    inquirer
        .prompt([{
                name: "item_id",
                type: "number",
                validate: function(value) {
                    if (isNaN(value) === false)
                        return true;
                    else
                        return false;
                },
                message: "Enter the item ID to add inventory: "
            },
            {
                name: "quantity",
                type: "input",
                message: "Enter quantity to add to this item: ",
                validate: function(value) {
                    if (isNaN(value) === false)
                        return true;
                    else
                        return false;
                }
            }
        ])
        .then(function(answer) {

            connection.query("SELECT * FROM products WHERE id= ?", [answer.itemid], function(err, results) {
                if (err) throw err;

                var newStock = results[0].quantity + parseInt(answer.quantity);
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            quantity: newStock
                        },
                        {
                            id: answer.itemid
                        }
                    ],
                    function(error, res) {
                        if (error) throw err;
                        console.log("\n" + "Items were added. Restock was successful!");
                        // call ask if want more
                        menu();
                    }
                );


            })


        });
}