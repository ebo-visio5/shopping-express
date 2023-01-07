const express = require('express')
const morgan = require('morgan');
require('dotenv').config({path: './.env'})
const router = require('./routes')


const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :remote-user :date"))


app.use('/items',router)
app.use('*', (req, res)=>{
    res.status(401).send('unknown url or file path')
})

app.listen(port, ()=>{
    console.info(`listening on ${port}`)
})