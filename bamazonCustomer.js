// Challenge #1: Customer View (Minimum Requirement)

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
    console.log("Connected as id: " + connection.threadID + "\n");
    inventory();
})

var inventory = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id, results[i].product_name, results[i].price)
        }

        askthecustomer()
    })
}

var askthecustomer = function() {

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
                        // be sure you have enough invertory
                        //if yes you need to sell and upate the inventory
                        // if not you nitt to tell the customer
                        //   connection.query(
                        //     "INSERT INTO auctions SET ?",
                        //     {
                        //       item_name: answer.item,
                        //       category: answer.category,
                        //       starting_bid: answer.startingBid || 0,
                        //       highest_bid: answer.startingBid || 0
                        //     },
                        //     function(err) {
                        //       if (err) throw err;
                        //       console.log("Your auction was created successfully!");
                        //       // re-prompt the user for if they want to bid or post
                        //       start();
                        //     }
                        //   );
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