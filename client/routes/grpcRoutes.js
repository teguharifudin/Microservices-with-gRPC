const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  GRPC_PORT
} = process.env

const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto')
const productProtoDefinition = protoLoader.loadSync(productProtoPath)
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product
const client = new productPackageDefinition.ProductService(
  `localhost:${GRPC_PORT}`,
  grpc.credentials.createInsecure()
)

const listProducts = (req, res) => {
  client.listProducts({}, (err, result) => {
    res.json(result)
  })
}

const readProduct = (req, res) => {
  const payload = {
    id: parseInt(req.params.id)
  }

  client.readProduct(payload, (err, result) => {
    if (err) {
      res.json({ message: 'That product does not exist.' })
    } else {
      res.json(result)
    }
  })
}

const createProduct = (req, res) => {
  const payload = {
    name: req.body.name,
    price: req.body.price
  }

  client.createProduct(payload, (err, result) => {
    res.json(result)
  })
}

const updateProduct = (req, res) => {
  const payload = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price
  }

  client.updateProduct(payload, (err, result) => {
    if (err) {
      res.json({ message: 'That product does not exist.' })
    } else {
      res.json(result)
    }
  })
}

const deleteProduct = (req, res) => {
  const payload = {
    id: parseInt(req.params.id)
  }

  client.deleteProduct(payload, (err, result) => {
    if (err) {
      res.json({ message: 'That product does not exist.' })
    } else {
      res.json(result)
    }
  })
}

module.exports = {
  listProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}