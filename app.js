const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler.js');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const defaultRouter = require('./routers/router.js')
app.use('/', defaultRouter)
app.use(errorHandler)

app.listen(PORT, function(){
    console.log(`listening at ${PORT}`)
})