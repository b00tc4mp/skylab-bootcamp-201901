const auth = require('../middleware/auth')
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const logic = require('../logica');
const handleErrors = require('../middleware/handle-errors')


router.get('/me', auth, (req, res) => {

    handleErrors(async() => {
    
        const orga = await logic.retrieveOrganization(req.user._id)
        res.json(orga);
    
    }, res)
})

router.post('/', (req, res) => {

    handleErrors(async() => {
        
        await logic.createOrganization(req.body)
    
        res.jason({message: 'Registered correctly...'})
    }, res)

})

router.post('/auth', (req, res) => {

    handleErrors(async() => {
        const sub = await logic.authenticateOrganization(req.body)

        const token = jwt.sign({sub} , config.get('jwtPrivateKey'));

        res.send({ message: 'You are logged...', token })

    }, res)


})



module.exports = router;