require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const router = require('./routes')
const cors = require('cors')
 
const { env: { PORT }, argv: [, , port = PORT || 8080], } = process

const app = express()

// CORS --> Para permitir acceso a tu api desde otro dominio. Si pones un * en vez de una URL permite acceder de cualquier dominio(origen). El modulo cors de npm hace lo mismo que esto.
// app.use((req, res, next) => {
//     res.setHeader('Acces-Control-Allow-Origin', 'https://www.google.es')
//     res.setHeader('Access-Control-Allow-Headers', 'Authorization')  
//     res.setHeader('Access')  
//     next()
// })

app.use(cors())
app.use('/api', router)

app.use(function (req, res, next) {
    res.status(404).json({ message: 'Not found'})
    // res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))