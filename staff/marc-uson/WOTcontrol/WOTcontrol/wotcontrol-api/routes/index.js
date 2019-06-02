const express = require('express')
const logic = require('../logic')
const bodyParser = require('body-parser')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password, admin } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password, admin)
        res.status(201).json({ message: 'Ok, user registered.' }),
        res})
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () =>{
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '24h' })
        res.json({ token }),
        res})
})

router.get('/users', auth, (req, res) => {
    handleErrors(async() => {
        const { userId } = req
        const user = await logic.retrieveUser(userId)
        res.json(user)
    },
    res)
})

router.put('/users', auth, jsonParser, (req, res) => {
    handleErrors(async () => {
        const {  userId , body: { data } } = req
        await logic.updateUser(userId, data)
        res.status(200).json({ message: 'Ok, user data updated.' })
    },res)
})

router.delete('/users',auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        await logic.deleteUser(userId)
        res.status(204).json({ message: 'Ok, user deleted.' })
    },res)
})

// router.get('/info', (req, res) => {
//     logic.testGet('Get test')
//     res.json({ Status: 'OK' })
// })

// router.post('/', jsonParser, (req, res) => {
//     const { body: { data } } = req
//     logic.testGet(data)
//     res.json({ Status: 'OK' })
// })

// router.get('/test', (req, res) => {
//     logic.testGet('Get test')
//     res.json({ Status: 'OK' })
// })

// router.get('/test/data', (req, res) => {
//     const { query: { dOut, dIn, aIn, aOut } } = req
//     var response = ''
//     var response1 = ''
//     var response2 = ''
//     var response3 = ''
//     var response4 = ''
//     if (dOut) response1 = logic.handleDigitalOutputs(dOut)
//     if (dIn) response2 = logic.handleDigitalInputs(dIn)
//     if (aIn) response3 = logic.handleAnalogInputs(aIn)
//     if (aOut) response4 = logic.handleAnalogOutputs(aOut)

//     response = response1.concat(response2, ',', response3, ',', response4)
//     res.json({response})
// })

module.exports = router