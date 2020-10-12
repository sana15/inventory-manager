from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask import request
from flask_cors import CORS
import sys

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'inventoryMain'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

cors = CORS(app)

@app.route('/')
def home():
    return str('Welcome home !')

@app.route('/arg-test')
def argTest():
    if request.args:
        req = request.args
        return " ".join(f"{k}: {v} " for k, v in req.items())
    return "No query"


@app.route('/products/all')
def fetchAllProducts(): #CRUD R - retrieve
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * from products''')
    rv = cur.fetchall()
    return jsonify(rv)

@app.route('/product')
def getProductById(): #CRUD R - retrieve
    cur = mysql.connection.cursor()
    if request.args:
        req = request.args
        productId = req.get("id")
        print(productId)
        cur.execute('''SELECT * from products WHERE id = %s''', [productId])
        rv = cur.fetchall()
        return str(rv)

@app.route('/product',methods=["POST", "PUT", "DELETE"])
def productCUD(): #CRUD CUD
    cur = mysql.connection.cursor()
    if request.method == "POST":
        #add product
        req = request.form
        productName = req.get("productName")
        quantity = req.get("quantity")
        cur.execute('''INSERT INTO products (name, quantity) VALUES (%s, %s)''', [productName, quantity])
        mysql.connection.commit()
        return str("Inserted " + str(productName))

    if request.method == "PUT":
        #modify product
        req = request.form
        productId = req.get("id")
        productName = req.get("productName")
        quantity = req.get("quantity")
        cur.execute('''UPDATE products SET name = %s, quantity = %s WHERE id = %s''',[productName, quantity, productId])
        mysql.connection.commit()
        return str("Updated " + str(productName))

    if request.method == "DELETE":
        #delete product
        req = request.form
        productId = req.get("id")
        cur.execute('''DELETE FROM products WHERE id = %s''', [productId])
        mysql.connection.commit()
        return str("Deleted product id " + str(productId))

@app.route('/locations/all')
def fetchAllLocations(): #CRUD R - retrieve
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * from locations''')
    rv = cur.fetchall()
    return jsonify(rv)

@app.route('/location')
def getLocationById(): #CRUD R - retrieve
    cur = mysql.connection.cursor()
    if request.args:
        req = request.args
        print("req",req)
        locationId = req.get("id")
        print("locationId",locationId)
        # locationId = 1
        print(locationId)
        cur.execute('''SELECT * from locations WHERE id = %s''', [locationId])
        rv = cur.fetchall()
        print("rv",rv)
        return jsonify(rv)
    else:
        return ("returned none")

@app.route('/location',methods=["POST", "PUT", "DELETE"])
def locationCUD(): #CRUD CUD
    cur = mysql.connection.cursor()
    if request.method == "POST":
        #add product
        req = request.form
        locationName = req.get("locationName")
        print("locationName",locationName)
        cur.execute('''INSERT INTO locations (name) VALUES (%s)''', [locationName])
        # cur.execute("INSERT INTO locations name VALUES {}".format(str(locationName)))
        mysql.connection.commit()
        return str("Inserted " + str(locationName))

    if request.method == "PUT":
        #modify product
        req = request.form
        print(req);
        locationId = req.get("locationId")
        locationName = req.get("locationName")
        cur.execute('''UPDATE locations SET name = %s WHERE id = %s''',[locationName, locationId])
        mysql.connection.commit()
        return str("Updated " + str(locationName))

    if request.method == "DELETE":
        #delete product
        req = request.form
        locationId = req.get("locationId")
        cur.execute('''DELETE FROM locations WHERE id = %s''', [locationId])
        mysql.connection.commit()
        return str("Deleted product id " + str(locationId))

@app.route('/movements/all')

def fetchAllMovements(): #CRUD R - retrieve
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * from movements''')
    rv = cur.fetchall()
    return jsonify(rv)

@app.route('/movement',methods=["POST", "DELETE"])

def movementCUD(): #CRUD CUD
    cur = mysql.connection.cursor()
    if request.method == "POST":
        #add product
        req = request.form
        productId = req.get("productId")
        fromLocation = req.get("fromLocation")
        toLocation = req.get("toLocation")
        quantity = req.get("quantity")
        cur.execute('''INSERT INTO movements (productId,fromLocation, toLocation, quantity) VALUES (%s,%s,%s,%s)''',
         [productId, fromLocation, toLocation, quantity ])
        # cur.execute("INSERT INTO locations name VALUES {}".format(str(locationName)))
        mysql.connection.commit()
        return str("Inserted " + str(productId))

    

    if request.method == "DELETE":
        #delete product
        req = request.form
        movementId = req.get("id")
        cur.execute('''DELETE FROM movements WHERE id = %s''', [movementId])
        mysql.connection.commit()
        return str("Deleted movement id " + str(movementId))





if __name__ == '__main__':
    app.run(debug=True)