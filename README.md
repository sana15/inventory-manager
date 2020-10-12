# inventory-manager
## Full stack inventory manager application using Flask, HTML & jQuery
A RESTful Web Service built for Inventory management Project with Python 3.8.2
 and Javascript

## Installation

``` pip3 install python3 ```
will perform installation of all modules required to run the project.

``` sudo apt install mysql-server  ```
 ``` sudo mysql_secure_installation ```

 for mysql run commands
CREATE DATABASE inventoryMain;
 mysql -u root -p inventoryMain < inventorydb.sql


## Running the service

```backend/inventory-main.py``` is the entry point of the project.


## API Endpoints


1. Get all products

GET ```http://localhost:3000/products/all```

2. Get all locations

GET ```http://localhost:3000/locations/all```

3. Get all movements

GET ```http://localhost:3000/movements/all```



## Query Param details

1. ```id``` : product Id, location Id, movements Id

## Products Page

![products](https://user-images.githubusercontent.com/13717573/95108915-80d72800-0759-11eb-9018-0f2faca16fed.png)

## Location Page
![location](https://user-images.githubusercontent.com/13717573/95109668-8aad5b00-075a-11eb-84a3-7875674fb359.png)

## Movements Page

![movemnets](https://user-images.githubusercontent.com/13717573/95735401-6265b500-0ca2-11eb-9d69-857baa8a9896.png)


