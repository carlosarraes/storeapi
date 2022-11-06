require('dotenv').config()
require('express-async-errors')
const express = require('express')
const colors = require('colors')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

colors.enabled = true

const port = process.env.PORT || 3000

// ? Middleware
app.use(express.json())

// * Routes
app.get('/', (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">Link</a>')
})
app.use('/api/v1/products', productsRouter)

// ? Middleware
app.use(errorMiddleware)
app.use(notFoundMiddleware)

// ! Application
const start = async () => {
  try {
    // connectDb
    await connectDB(process.env.MONGO_URL)
    console.log('[MongoDB] started'.brightGreen.bold)
    app.listen(port, console.log(`Listening on: http://localhost:${port}/`.brightCyan.bold))
  } catch (error) {
    console.log(error)
  }
}

start()
