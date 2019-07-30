const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey } } = process


router.get('/me', auth, (req, res) => {

    handleErrors(async () => {
        debugger
        const { userId } = req

        const user = await logic.retrieveUser(userId)

        res.json(user);

    }, res)

})

router.post('/', (req, res) => {
    debugger
    handleErrors(async () => {

        const { body: { fullname, email, role, organization, phone, position, password } } = req

        await logic.createUser(fullname, email, role, organization, phone, position, password);

        res.json({ message: 'User registered' });

    }, res)
})

router.post('/auth', (req, res) => {

    handleErrors(async () => {

        const { body: { email, password } } = req

        const {userId , orgId} = await logic.authenticateUser(email, password);
        debugger
        const token = jwt.sign({userId , orgId}, jwtPrivateKey);
        debugger
        res.json({ message: 'User logged in', token })

    }, res)

})

module.exports = router;
