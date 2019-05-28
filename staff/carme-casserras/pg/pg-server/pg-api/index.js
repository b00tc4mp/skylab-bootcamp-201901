require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('../pg-api/routes')
const {mongoose} = require('pg-data')



const {env: {PORT, MONGO_URL : url} } = process;
// const {env: {PORT, MONGO_URL : url}, argv: [, , port = PORT || 3000], } = process

const app = express()
mongoose.connect(url, {useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true});
// (async () => {
    
    
    // app.use(cors)
    // app.use('/api', routes)
    // app.use(function (req, res, next) {
    //     res.status(404).json({error: 'Not found'})
    // })

// })


app.listen(PORT, () => {
    console.log(`servidor conectado al puerto ${PORT}`)
})