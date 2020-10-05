# inventory-manager
## Full stack inventory manager application using Flask, HTML & jQuery
A RESTful Web Service built for Smartgate Project with python Python 3.8.2
 and Javascript

## Installation

``` pip3 install python3 ```
will perform installation of all modules required to run the project.

## Running the service

```backend/inventory-main.py``` is the entry point of the project.


## API Endpoints


Eg: ```http://localhost:3000/api/ipcam/configs```

1. Get Camera and General configurations
GET ```http://localhost:3000/api/ipcam/configs```

Note: All the configurations should be stored over **src/config/ipcams.json**

2. Capture an image by camera id

GET ```http://localhost:3000/api/ipcam/capture?id=c1&binary=false&resolution=640x480&type=png```

3. Get all products

GET ```http://localhost:3000/products/all```

4. Get all locations

GET ```http://localhost:3000/locations/all```

4. Get all movemnets

GET ```http://localhost:3000/movements/all```



## Query Param details

1. ```id``` : product Id, location Id, movements Id


