const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

router.get('/me', auth, (req, res) => {

    handleErrors(async () => {
        const { userId } = req
        const user = await logic.retrieveUser(userId)

        res.json(user);

    }, res)

})

router.post('/', (req, res) => {

    handleErrors(async () => {

        await logic.createUser(req.body);

        res.json({ message: 'Registered correctly...' });

    }, res)
})

router.post('/auth', (req, res) => {

    handleErrors(async () => {
        const { body: { email, password } } = req
        const user = await logic.authenticateUser(email, password);
        const { sub, subOrga } = user
        let token
        if (sub & !subOrga) {
            token = jwt.sign({ sub }, config.get('jwtPrivateKey'));
        } else {
            token = jwt.sign({ sub, subOrga }, config.get('jwtPrivateKey'));
        }
        res.json({ message: 'You are logged...', token })
    }, res)

})

module.exports = router;
