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



###Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
###Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
###The app should then prompt users with two messages.



-The first should ask them the ID of the product they would like to buy.
-The second message should ask how many units of the product they would like to buy.



###Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.



###If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



###However, if your store does have enough of the product, you should fulfill the customer's order.


###This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

## Challenge #2: Manager View (Next Level)

- View Products for sale 
- View Low Inventory
- Update Inventory Quantity
- Add New Product
- Log out

#### View Products for sale
* This function will pull all information from MySQL for the store's item inventory. This will pull and display item name, item price, department that the item is in, and how much stock there is of the item. The table is made more visually appealing with console.table. The manager is prompted to sign out or go back to the main menu.

#### View Low Inventory
* This function will filter out all items from the MySQL database with inventory less than 10 and display those items. The table is made more visually appealing with console.table. The manager is prompted to sign out or go back to the main menu.

#### Update Inventory Quantity
*This will allow the manager to redefine the amount of stock each item has. The function is able to search for the seed of data from MySQL and update the particular stock quantity based on the manager's item id input. The function will then show the new quantity and prompt the manager to log out or go back to the menu.

#### Add New Product
* This function will look at the manager's request to add a new item, and if the item already exists, there will be a message telling the manager that. If there is no item like that already in the database, the price, department, name, and quantity will all be inserted into the MySQL database. The manager will then be prompted to log out or go back to the main menu


## Technologies used in this project

- javascript
- jQuery
- Node JS
- JSON
- npm inquirer
- npm console.table
- MySQL




