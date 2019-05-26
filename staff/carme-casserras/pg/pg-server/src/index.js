require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


const app = express()

const router = express.Router()
const jsonBodyParser = bodyParser.json() 
const {Schema} = mongoose

const {env: {PORT, MONGO_URL : url}} = process

mongoose.connect(url, {useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true})

app.listen(PORT, () => {
    console.log(`servidor conectado al puerto ${PORT}`)
})