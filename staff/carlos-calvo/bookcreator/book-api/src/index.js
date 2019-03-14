require('dotenv').config()
require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
// const parseImageUpload = require('../src/middleware-cloudinary')
const package = require('../package.json')
const cors = require('cors')

const { registerUser, 
    authenticateUser, 
    retrieveUser, 
    updateUser, 
    notFound, 
    addBook, 
    retrieveBooks, 
    deleteBook, 
    retrieveBook,
    imageUpload,
    updateBook,
    addBookToTemplates,
    retrieveTemplates,
    addTemplateToUserBooks,
    retrieveTemplateBook,
    getEpub
 } = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET //Initialize key for token

        const app = express() //Express server

        const jsonBodyParser = bodyParser.json() //Bodyparser for body

        const router = express.Router() //router

        app.use(express.json({limit: '50mb'})); //Set more limit to size because otherwise it refuses size = 1MB
        app.use(express.urlencoded({limit: '50mb'}));

        router.use(cors()) //Para el Cors, evita el bloqueo del navegador por seguridad cuando hace llamadas a diferentes URLs.
        
        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.post('/book/add', [jsonBodyParser, tokenVerifierMiddleware], addBook)

        router.put('/user/update', jsonBodyParser, updateUser)

        router.get('/user', tokenVerifierMiddleware, retrieveUser)

        router.get('/books/retrieve', tokenVerifierMiddleware, retrieveBooks)

        router.get('/book/retrieve/:id', [jsonBodyParser, tokenVerifierMiddleware], retrieveBook )

        router.delete('/book/delete',[jsonBodyParser, tokenVerifierMiddleware], deleteBook )

        router.post('/image/upload',  jsonBodyParser, imageUpload )

        router.post('/book/update',[jsonBodyParser, tokenVerifierMiddleware], updateBook)

        router.post('/book/addBookToTemplates', jsonBodyParser, addBookToTemplates)

        router.get('/book/retrieveTemplates', retrieveTemplates)

        router.post('/book/addTemplateToUserBooks',[jsonBodyParser, tokenVerifierMiddleware] , addTemplateToUserBooks)

        router.get('/book/getEpub/:id',[jsonBodyParser, tokenVerifierMiddleware] , getEpub)

        router.get('/book/retrieveTemplate/:id',jsonBodyParser, retrieveTemplateBook )

        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
    })
    .catch(console.error)

