const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler.js');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const defaultRouter = require('./routers/router.js')
app.use('/', defaultRouter)
app.use(errorHandler)


module.exports = app
