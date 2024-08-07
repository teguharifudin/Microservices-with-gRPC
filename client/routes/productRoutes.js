const express = require('express')
const grpcRoutes = require('./grpcRoutes')

const router = express.Router()

router.get('/products', grpcRoutes.listProducts)
router.get('/products/:id', grpcRoutes.readProduct)
router.post('/products', grpcRoutes.createProduct)
router.put('/products/:id', grpcRoutes.updateProduct)
router.delete('/products/:id', grpcRoutes.deleteProduct)

module.exports = router