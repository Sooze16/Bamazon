# Bamazon
An Amazon-like storefront utilizing the MySQL database is a command line storefront for purchasing items on the customer side, and for managing inventory on the management side. This program challenges the user to accomplish different terminal based commands using Node JS. This program uses MySQL for dynamic data CRUD operations.



## Challenge #1: Customer View (Minimum Requirement)

- Create a MySQL Database called bamazon.
- Then create a Table inside of that database called products.
- The products table should have each of the following columns:

        item_id (unique id for each product)
        product_name (Name of product)
        department_name
        price (cost to customer)
        stock_quantity (how much of the product is available in stores)



Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app should then prompt users with two messages.

- The first should ask them the ID of the product they would like to buy.

- The second message should ask how many units of the product they would like to buy.



Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.


However, if your store does have enough of the product, you should fulfill the customer's order.


This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

## Challenge #2: Manager View (Next Level)

Create a new Node application called bamazonManager.js. 

Running this application will:
- View Products for sale 
- View Low Inventory
- Update Inventory Quantity
- Add New Product
- Log out


If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


## Technologies used in this project

- javascript
- jQuery
- Node JS
- JSON
- npm inquirer
- npm cli-table
- npm colors
- MySQL

## Video Link to Demo:

### Customer Demo:
https://drive.google.com/file/d/1fm5_MSZjmCHGw6khCQmlljz44SiTUESI/view

### Manager Demo:

https://drive.google.com/file/d/1HU_Nu4bk3qVu9Eth7yMJa3iLC2AYxvM5/view






