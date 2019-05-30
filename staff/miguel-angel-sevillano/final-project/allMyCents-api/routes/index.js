const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/user/register', jsonParser, (req, res) => {                               //REGISTER

    const { body: { name, surname, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password)
        res.status(201).json({ message: 'Ok, user registered.' })
    }, res)

})

router.post('/user/auth', jsonParser, (req, res) => {                                   //AUTH
    const { body: { email, password } } = req

    handleErrors(async () => {
        let sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '10h' })
        res.json({ token })
    }, res)
})

router.get('/user/retrieve', auth, (req, res) => {                                  //RETRIVE
    handleErrors(async () => {
        const { userId } = req

        let user = await logic.retrieveUser(userId)
        res.json(user)
    }, res)
})

router.put('/user/update', auth, jsonParser, (req, res) => {                        //UPDATE

    handleErrors(async () => {
        const { userId, body } = req

        let user = await logic.updateUser(userId, body)
        res.json(user)
    }, res)
})

router.delete('/user/delete', auth, (req, res) => {                             //DELETE

    handleErrors(async () => {
        const { userId } = req

        let user = await logic.deleteUser(userId)
        res.json(user)
    }, res)
})


router.get('/tickets', auth, (req, res) => {                        //GET ALL TICKETS
    handleErrors(async () => {
        const { userId } = req

        let user = await logic.listPrivateTickets(userId)
        res.json(user)
    }, res)
})

router.put('/ticket/addTicket', auth, jsonParser, (req, res) => {                       //ADD TICKET

    handleErrors(async () => {
        const { userId, body } = req

        let user = await logic.addPrivateTicket(userId, body)
        res.json(user)
    }, res)
})

router.get('/ticket/retrieve/:ticketId', auth, (req, res) => {                      //RETRIVE A SINGLE TICKET
    handleErrors(async () => {
        const { userId, params: { ticketId } } = req
        let user = await logic.retrivePrivateTicket(userId, ticketId)
        res.json(user)
    }, res)
})


router.post('/ticket/retrieve-dates', auth, jsonParser, (req, res) => {             //RETRIVE TICKETS BY DATES
    handleErrors(async () => {

        const { userId, body: { data } } = req

        let user = await logic.retrivePrivateTicketsByDates(userId, data)
        res.json(user)
    }, res)
})


router.put('/ticket/update/:ticketId', auth, jsonParser, (req, res) => {            //UPDATE A SINGLE TICKET
    handleErrors(async () => {
        const { userId, params: { ticketId }, body: { data, position } } = req

        let user = await logic.updatePrivateTicket(userId, ticketId, data, position)
        res.json(user)
    }, res)
})



router.delete('/ticket/delete/:ticketId', auth, (req, res) => {                         //DELTE A SINGLE TICKET

    handleErrors(async () => {
        const { userId, params: { ticketId } } = req

        let user = await logic.removePrivateTicket(userId, ticketId)
        res.json(user)
    }, res)
})

router.delete('/ticket/delete', auth, (req, res) => {                       //DELETE ALL TICKETS

    handleErrors(async () => {
        const { userId } = req

        let user = await logic.removeAllPrivateTickets(userId)
        res.json(user)
    }, res)
})

router.put('/alert/addAlert', auth, jsonParser, (req, res) => {                       //ADD ALERT

    handleErrors(async () => {
        const { userId, body } = req

        let user = await logic.addAlert(userId, body)
        res.json(user)
    }, res)
})

router.get('/alert/listAlerts', auth, jsonParser, (req, res) => {                       //LIST ALERTS

    handleErrors(async () => {
        const { userId} = req

        let user = await logic.listAlerts(userId)
        res.json(user)
    }, res)
})

router.put('/alert/update/:alertId', auth, jsonParser, (req, res) => {            //UPDATE AN ALERT VALUE
    handleErrors(async () => {
        const { userId, params: { alertId }, body } = req

        let user = await logic.editAlert(userId, alertId, body)
        res.json(user)
    }, res)
})


router.delete('/alert/delete/:alertId', auth, (req, res) => {                       //DELETE AN ALERT

    handleErrors(async () => {
        const { userId,params: { alertId } } = req

        let user = await logic.deleteAlert(userId,alertId)
        res.json(user)
    }, res)
})

router.delete('/alert/delete/', auth, (req, res) => {                       //DELETE ALL ALERTS

    handleErrors(async () => {
        const { userId} = req

        let user = await logic.deleteAllAlerts(userId)
        res.json(user)
    }, res)
})



module.exports = router