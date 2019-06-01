require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./src/routes')
const cors = require('./src/routes/cors')
const { mongoose } = require('dashboard-data')

// url data base productiom
//const { env: { PORT, MONGO_URL: url }, argv: [, , port = PORT || 8080], } = process;


//url to test client side
const { env: { PORT, MONGO_URL_CLIENT_SIDE_TEST : url }, argv: [, , port = PORT || 8080], } = process;



(async () => {
    try{

        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
    
        console.log( `connect to data base ${url}`)
    
        // express
    
        const app = express()
    
        app.use(cors)
    
        app.use('/api', routes)
    
        app.use(function (req, res, next) {
            res.status(404).json({ error: 'Not found.' })
        })
    
        app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))
    
    } catch (err){

        console.error(err)
    }
})()

process.on('SIGINT', async ()=>{
    await mongoose.disconnect()
    console.log(`Dashboard stopped running`)
    process.exit(0)
})