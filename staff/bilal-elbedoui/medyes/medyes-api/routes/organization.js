const auth = require('../middleware/auth')
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey }} = process


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

        const token = jwt.sign({sub} , jwtPrivateKey);

        res.send({ message: 'You are logged...', token })

    }, res)


})



module.exports = router;
