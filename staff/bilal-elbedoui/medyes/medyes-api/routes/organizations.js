const auth = require('../middleware/auth')
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const logic = require('../logic');
const handleErrors = require('../middleware/handle-errors')

const { env: { jwtPrivateKey } } = process


router.get('/me', auth, (req, res) => {

    handleErrors(async () => {
        const { user: { id } } = req
        const organization = await logic.retrieveOrganization(id)

        res.json(organization);

    }, res)
})

router.post('/', auth, (req, res) => {

    handleErrors(async () => {
        debugger
        const { userId, body: { name, phone, address, mail } } = req

        const organizationId= await logic.createOrganization(userId, name, phone, address, mail)

        res.json({ message: `Organization registered, Here is the Organization key ${organizationId}` })
    }, res)

})

module.exports = router;
