const auth = require('../middleware/auth')
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey } } = process


router.get('/me', auth, (req, res) => {

    handleErrors(async () => {

        const organization = await logic.retrieveOrganization(req.user._id)

        res.json(organization);

    }, res)
})

router.post('/', auth, (req, res) => {

    handleErrors(async () => {
        const { body: { name, phone, address, mail } } = req

        await logic.createOrganization(name, phone, address, mail)

        res.json({ message: 'Organization registered' })
    }, res)

})

module.exports = router;
