
const express = require('express')
const cors = require('../cors')
const bodyParser = require('body-parser')
const tokenHelper = require('../token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const { registerUser, registerPet, authenticateUser, retrieveUsers, retrieveUser,retrievePet, retrievePets,updateUser, updatePet,notFound} = require('./handlers')

const jsonBodyParser = bodyParser.json()

const router = express.Router()
router.use(cors)

// app.use(cors)

router.post('/user', jsonBodyParser, registerUser)

router.post('/pet', jsonBodyParser, registerPet)

router.post('/user/auth', jsonBodyParser, authenticateUser)

router.get('/users', tokenVerifierMiddleware, retrieveUsers)

router.get('/pets/:ownerId', tokenVerifierMiddleware, retrievePets)

router.get('/user/:userId', tokenVerifierMiddleware, retrieveUser)
// router.get('/pet', tokenVerifierMiddleware, jsonBodyParser, retrievePet)

router.put('/user', [tokenVerifierMiddleware, jsonBodyParser], updateUser)
// router.put('/pet', tokenVerifierMiddleware, jsonBodyParser, updatePet)

        //app.get('*', notFound)

// app.use('/api', router)

//         app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
//     })
//     .catch(console.error)

// process.on('SIGINT', () => {
//     mongoose.disconnect()
//         .then(() => {
//             console.log(`\n ${package.name} stopped`)
            
//             process.exit(0)
//         })
// })

module.exports = router