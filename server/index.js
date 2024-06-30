require('dotenv').config()

const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  PORT,
  NODE_ENV,
} = process.env

const environment = NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto')
const productProtoDefinition = protoLoader.loadSync(productProtoPath)
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product

const listProducts = (call, callback) => {
  knex('products')
    .then(data => {
      callback(null, {
        products: data
      })
    })
}

const readProduct = (call, callback) => {
  knex('products')
    .where({
      id: parseInt(call.request.id)
    }).then(data => {
      if (data.length) {
        callback(null, data[0])
      } else {
        callback({ message: 'That product does not exist.' })
      }
    })
}

const createProduct = (call, callback) => {
  knex('products')
    .insert({
      name: call.request.name,
      price: call.request.price,
    })
    .then(_ => {
      callback(null, {
        status: 'success'
      })
    })
}

const updateProduct = (call, callback) => {
  knex('products')
    .where({
      id: parseInt(call.request.id)
    })
    .update({
      name: call.request.name,
      price: call.request.price
    })
    .returning()
    .then(data => {
      if (data) {
        callback(null, {
          status: 'success'
        })
      } else {
        callback({ message: 'That product does not exist.' })
      }
    })
}

const deleteProduct = (call, callback) => {
  knex('products')
    .where({
      id: parseInt(call.request.id)
    })
    .delete()
    .returning()
    .then(data => {
      if (data) {
        callback(null, {
          status: 'success'
        })
      } else {
        callback({ message: 'That product does not exist.' })
      }
    })
}

const main = () => {
  const server = new grpc.Server()

  server.addService(productPackageDefinition.ProductService.service, {
    listProducts: listProducts,
    readProduct: readProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
  })

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Server binding failed: ${error.message}`);
      return;
    }
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

main()