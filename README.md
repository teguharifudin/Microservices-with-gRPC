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
npm install
```
```
npm start
```

#### Invoke a gRPC request in Postman

Enter URL: 0.0.0.0:50051 and import and select protos: ProductService/createProduct
```
{"name":"white board","price":"9.99"}
```

### Client
```
cd client
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