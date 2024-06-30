require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes')

const {
  APP_PORT
} = process.env

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', productRoutes)

app.listen(APP_PORT, () => {
  console.log(`Server listing on port: ${APP_PORT}`)
})