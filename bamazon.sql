drop database if exists bamazon_db;
create database bamazon_db;


USE bamazon_db;

create table products (
item_id int not null AUTO_INCREMENT,
product_name varchar (100),
department_name varchar (50),
price DECIMAL (10,2),
stock_quantity int (50),
primary key (item_id)

);

USE bamazon_db;

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ( "mascara", "beauty", 10.50, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("blush", "beauty", 12.00, 400);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("003", lipstick, beauty, 18.50, 300);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("004", foundation, beauty, 32.50, 100);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("010", shampoo , health, 25.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("011", soap, health, 3.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("012", conditioner, health, 25.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("013", toner, health, 10.50, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("021", hair_brush, tools, 10.50, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("001", cotton_rounds, tools, 10.50, 150);