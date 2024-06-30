![](https://www.teguharief.com/img/teguh-arief.png)

# Microservices with gRPC

Node.js microservices with gRPC using PostgreSQL.

## Installation

### From source

```
git clone git@github.com:teguharifudin/Microservices-with-gRPC.git
```
```
cd Microservices-with-gRPC
```

## Developing

### Server
```
cd server
```
```
touch .env
```
```
NODE_ENV=development
PORT=50051

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=
DB_PORT=5432
DB_DATABASE=macbookpro
```
```
npm install
```
```
npm start
```

#### Invoke a gRPC request in Postman

Enter URL: http://0.0.0.0:50051/ and import and select protos: ProductService/createProduct
```
{"name":"pencil","price":"49.99"}
```

### Client
```
cd client
```
```
touch .env
```
```
APP_PORT=3000
GRPC_PORT=50051
```
```
npm install
```
```
npm start
```

#### List all products

http://127.0.0.1:3000/api/products

## Contributing

### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/teguharifudin/Microservices-with-gRPC/issues) to report any bugs or file feature requests.