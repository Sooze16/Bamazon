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
VALUES ("mascara", "beauty", 10.50, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("blush", "beauty", 12.00, 400);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("lipstick", "beauty", 18.50, 300);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("foundation", "beauty", 32.50, 100);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("shampoo" , "beauty", 25.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("soap", "beauty", 3.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("conditioner", "beauty", 25.00, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("hair_spray", "beauty", 22.75, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("hair_brush", "beauty_tools", 10.50, 150);

INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES ("cotton_rounds", "beauty_tools", 10.50, 150);