const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const {
    //user
    registerUser,
    loginUser,
    retrieveUser,
    updateUser,
    deleteUser,

    //congress
    createCongress,
    retrieveCongress,
    updateCongress,
    listCongress,
    deleteCongress,

    // artist
    createArtist
    

} = require('./routes')

const port = 8000

mongoose.connect('mongodb://localhost/laclave-data', { useNewUrlParser: true })
    .then(() => {  
        const app = express()
        const router = express.Router()
        const jsonBodyParser = bodyParser.json()
        app.use(cors())

        // user
        router.post('/user/register', jsonBodyParser, registerUser)
        router.post('/user/login', jsonBodyParser, loginUser)
        router.get('/user/get/:id', retrieveUser)
        router.put('/user/update/:id', jsonBodyParser, updateUser)
        
        router.delete('/user/delete/:id', deleteUser) // elimino al usuario pero me sale el Id undefined
        // consgress
        router.post('/congress/create', jsonBodyParser, createCongress)
        router.get('/congress/get/:id', retrieveCongress)
        router.put('/congress/update/:id', jsonBodyParser, updateCongress)
        router.get('/congress/list', listCongress)
        router.delete('/congress/list/:id', deleteCongress)

        //artist
        router.post('/artist/create', jsonBodyParser, createArtist)

        app.use('/api', router)

		app.listen(port, () => console.log(`server listening in port ${port}`))

    })
    .catch(error => console.log('error in mongoose connect ' + error.message))