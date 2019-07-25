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
    console.log("Connected as id: " + connection.threadId + "\n");
    inventory();
})


function displayTable(results) {
    console.log("");
    console.log("------------------------------------------------------------".silly);
    console.log("                Beauty Products Inventory List".debug);
    console.log("------------------------------------------------------------".silly);
    console.log("");

    var table = new Table({
        head: ["Product ID#", "Product Description", "Cost", "Stock"],
        colWidths: [15, 22, 10, 8],

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
}
var inventory = function() {
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        displayTable(results);
        askTheManager();
    });
}

var askTheManager = function() {

    inquirer
        .prompt([{
            name: "item_id",
            type: "list",
            choices: ["View Inventory", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit".silly],

            message: "\n" + "Please select inventory function?...."
        }])
        .then(function(res) {

            switch (res.item_id) {
                case "View Inventory":
                    inventory();

                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add To Inventory":
                    addToInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "Exit".silly:
                    connection.end();
                    break;

            }

        })

}

function lowInventory() {

    connection.query("SELECT * FROM products WHERE  stock_quantity <=5  ", function(err, results) {
        if (err) throw err;
        displayTable(results)
        askTheManager();
    })

}

function addToInventory() {

    inquirer
        .prompt([{
                name: "item_id",
                type: "input",
                message: "Enter the item ID# to add inventory: ",

                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n" + "Please enter a valid Product ID number".error)
                    return false;
                }
            },

            {
                name: "quantity",
                type: "input",
                message: "Enter quantity to add to this item: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\n" + "Please enter a number".error)
                    return false;
                }
            }
        ])
        .then(function(answer) {
            var inputId = parseInt(answer.item_id)
            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.item_id], function(err, results) {

                if (err) throw err;
                // console.log(results)

                var newStock = results[0].stock_quantity + parseInt(answer.quantity)

                var test = connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStock
                        },
                        {
                            item_id: answer.item_id
                        }
                    ],
                    function(error, results) {
                        if (error) throw err;
                        console.log("\n" + "Inventory has been updated".warn);
                        // call ask if want more
                        inventory()

                    }
                )

                // console.log(test.sql);





            })
        });

}


function newProduct() {

    inquirer
        .prompt([{

                name: "newItem",
                type: "input",
                message: "What new product would you like to add to inventory?",


            },

            {
                name: "department",
                type: "input",
                message: "Enter department name: "
            },

            {
                name: "price",
                type: "number",
                message: "Enter product unit cost: $",
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
                type: "number",
                message: "Enter unit quantity: ",
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
        connection.query("INSERT INTO products SET ?", {

                product_name: data.newItem,
                department_name: data.department,
                price: data.price || 0,
                stock_quantity: data.quantity || 0

            },

            function(error) {
                if (error) throw err;
                console.log("Item Added to Inventory.".warn);
                inventory();
                // askTheManager();
            }

        )
    });
}