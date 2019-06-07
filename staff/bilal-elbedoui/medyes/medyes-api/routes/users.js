const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey } } = process


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

        await logic.createUser(fullname, email, role, organization, phone, situation, password);

        res.json({ message: 'User registered' });

    }, res)
})

router.post('/auth', (req, res) => {

    handleErrors(async () => {

        const { body: { email, password } } = req

        const info = await logic.authenticateUser(email, password);

        const token = jwt.sign(info, jwtPrivateKey);

        res.json({ message: 'User logged in', token })

    }, res)

})

module.exports = router;
