const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey }} = process


router.get('/me', auth, (req, res) => {

    handleErrors(async () => {
        const { userId } = req
        
        const user = await logic.retrieveUser(userId)

        res.json(user);

    }, res)

})

router.post('/', (req, res) => {

    handleErrors(async () => {

        const { body: { fullname, email, role, organization, phone, situation, password } } = req
        if(organization){
            await logic.createUser(fullname, email, role, organization, phone, situation, password);
        }else{
            await logic.createUser(fullname, email, role, undefined, phone, situation, password);
        }
        res.json({ message: 'Registered correctly...' });

    }, res)
})

router.post('/auth', (req, res) => {

    handleErrors(async () => {

        const { body: { email, password } } = req

        const user = await logic.authenticateUser(email, password);
        
        const { sub, org } = user
        debugger
        let token
        
        if (sub & !org) {
            token = jwt.sign({ sub }, jwtPrivateKey);
        } else {
            token = jwt.sign({ sub, org }, jwtPrivateKey);
        }

        res.json({ message: 'You are logged...', token })

    }, res)

})

module.exports = router;
