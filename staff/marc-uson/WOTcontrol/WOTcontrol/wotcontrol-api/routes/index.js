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
        res.status(201).json({ message: 'Ok, user registered.' })
    }, res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () => {
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    }, res)
})

router.get('/users', auth, (req, res) => {
    const { userId } = req

    handleErrors(async () => {
        const user = await logic.retrieveUser(userId)
        res.json(user)
    }, res)
})

router.put('/users', auth, jsonParser, (req, res) => {
    const { userId, body: { data } } = req

    handleErrors(async () => {
        await logic.updateUser(userId, data)
        res.status(200).json({ message: 'Ok, user data updated.' })
    }, res)
})

router.delete('/users', auth, (req, res) => {
    const { userId } = req

    handleErrors(async () => {
        await logic.deleteUser(userId)
        res.status(204).json({ message: 'Ok, user deleted.' })
    }, res)
})

router.post('/devices', auth, jsonParser, (req, res) => {
    const {userId, body: { name, ip, port } } = req

    handleErrors(async () => {
        await logic.addDevice(userId, name, ip, port)
        res.status(201).json({ message: 'Ok, new device added.' })
    }, res)
})

router.get('/devices/:name', auth, (req, res) => {
    const {userId, params: { name } } = req

    handleErrors(async () => {
        const device = await logic.retrieveDevice(userId, name)
        res.status(201).json(device)
    }, res)
})

router.post('/devices/:name', auth, jsonParser, (req, res) => {
    const { userId, params: { name }, body: { newName } } = req

    handleErrors(async () => {
        const response = await logic.changeDeviceId(userId, name, newName)
        res.status(201).json(response)
    }, res)
})

router.get('/devices/:name/activate/:time', auth, (req, res) => {
    const {userId, params: { name, time } } = req
    const _time = Number(time)

    handleErrors(async () => {
        const device = await logic.activateDevice(userId, name, _time)
        res.status(201).json(device)
    }, res)
})

router.delete('/devices/:name', auth, (req, res) => {
    const { userId, params: { name } } = req

    handleErrors(async () => {

        await logic.deleteDevice(userId, name)
        res.status(204).json({ message: 'Ok, device deleted.' })
    }, res)
})

router.post('/devices/:name/inputs', auth, jsonParser, (req, res) => {
    const {userId, params: { name }, body: { type, direction } } = req
    const _direction = Number(direction)
    handleErrors(async () => {
        await logic.addInput(userId, name, type, _direction)
        res.status(201).json({ message: 'Ok, device input added.' })
    }, res)
})

router.delete('/devices/:name/inputs/:type/:direction', auth, (req, res) => {
    const { userId, params: { name, type, direction } } = req
    const _direction = Number(direction)

    handleErrors(async () => {
        await logic.deleteInput(userId, name, type, _direction)
        res.status(204).json({ message: 'Ok, device input deleted.' })
    }, res)
})

router.post('/devices/:name/outputs', auth, jsonParser, (req, res) => {
    const {userId, params: { name }, body: {type, direction } } = req

    handleErrors(async () => {
        await logic.addOutput(userId, name, type, direction)
        res.status(201).json({ message: 'Ok, device output added.' })
    }, res)
})

router.delete('/devices/:name/outputs/:type/:direction', auth, (req, res) => {
    const { userId, params: { name, type, direction } } = req
    const _direction = Number(direction)
    handleErrors(async () => {
        await logic.deleteOutput(userId, name, type, _direction)
        res.status(204).json({ message: 'Ok, device output deleted.' })
    }, res)
})

router.get('/devices/:name/outputs/digital/:direction', auth, (req, res) => {
    const {userId, params: { name, direction } } = req
    const _direction = Number(direction)
    debugger
    handleErrors(async () => {
        const response = await logic.toggleDigitalOutput(userId, name, _direction)
        res.status(201).json(response)
    }, res)
})

router.get('/devices/:name/outputs/servo/:direction/:angle', auth, (req, res) => {
    const {userId, params: { name, direction, angle } } = req
    const _direction = Number(direction)
    const _angle = Number(angle)

    handleErrors(async () => {
        const response = await logic.setServoPosition(userId, name, _direction, _angle)
        res.status(201).json(response)
    }, res)
})

router.get('/devices/:name/outputs/motor/:direction/:speed', auth, (req, res) => {
    const {userId, params: { name, direction, speed } } = req
    const _direction = Number(direction)
    const _speed = Number(speed)

    handleErrors(async () => {
        const response = await logic.setMotorSpeed(userId, name, _direction, _speed)
        res.status(201).json(response)
    }, res)
})

router.post('/devices/:name/inputs/analog', jsonParser, (req, res) => {
    const {userId, params: { name }, body: { value } } = req
    const _value = Number(value)
    console.log(`analog value: ${value}`)
    // handleErrors(async () => {
    //     await logic.saveAnalogInput(userId, name, _value)
    //     res.status(201).json({ message: 'Ok, analog value recieved.' })
    // }, res)
})

router.get('/devices/:name/inputs/analog', auth,jsonParser, (req, res) => {
    const {userId, params: { name }} = req

    handleErrors(async () => {
        const response = await logic.retrieveAnalog(userId, name)
        res.status(201).json(response)
    }, res)
})

router.post('/devices/:name/inputs/digital', jsonParser, (req, res) => {
    const {userId, params: { name }, body: { din1, din2 } } = req
    const _value1 = Number(din1)
    const _value2 = Number(din2)
    console.log(`din1: ${din1}, din2: ${din2}`)

    // handleErrors(async () => {
    //     await logic.saveDigitalInput(userId, name, _value1)
    //     await logic.saveDigitalInput(userId, name, _value2)
    //     res.status(201).json({ message: 'Ok, digital values recieved.' })
    // }, res)
})

router.get('/devices/:name/inputs/digital/:direction', auth, jsonParser, (req, res) => {
    const {userId, params: { name, direction }} = req
    const _direction = Number(direction)

    handleErrors(async () => {
        const response = await logic.retrieveDigital(userId, name, _direction)
        res.status(201).json(response)
    }, res)
})


module.exports = router