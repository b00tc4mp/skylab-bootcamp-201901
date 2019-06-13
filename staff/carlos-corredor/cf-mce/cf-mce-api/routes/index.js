const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password, category } } = req

    handleErrors( async () => {
        await logic.registerUser(name, surname, email, password, category)
        return res.status(201).json({ message: 'Ok, user registered.' })
    }, res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors( async () => {
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '24h' })
        return res.json({ token })
    }, res)
})

router.get('/users', auth, (req, res) => {
    const { userId } = req
    handleErrors(async () => {
        const user = await logic.retrieveUser(userId)
        return res.json(user)
    }, res)
})

router.put('/users', auth, jsonParser, (req, res) => {
    const { body, userId } = req
    handleErrors(async () => {
        await logic.updateUser(userId, body)
        return res.status(201).json({ message: 'Ok, user updated.' })
    }, res)
})

router.delete('/users', auth, jsonParser, (req, res) => {
    const { body: {password}, userId } = req
    handleErrors(async () => {
        await logic.deleteUser(userId, password)
        return res.status(201).json({ message: 'Ok, user deleted.' })
    }, res)
})

router.post('/customers', auth, jsonParser, (req, res) => {
    const { body: {name, surname, phone, address, nid, email }, userId } = req

    handleErrors( async () => {
        // const user = await logic.retrieveUser(userId)
        // if(!user) throw new UnauthorizedError('wrong credentials')
        await logic.registerCustomer(name, surname, phone, address, nid, email)
        return res.status(201).json({ message: 'Ok, customer registered.' })
    }, res)
})

router.get('/customers', auth, jsonParser, (req, res) => {
    const { query } = req
    // key = Object.keys(query)[0]
    // value = query[key]
    // const criteria = {[key]: value};
    // let criteria = {}
    // criteria[key] = value
    handleErrors( async () => {
        const customers = await logic.findCustomers(query)
        return res.json(customers)
    }, res)
})

router.put('/customers/:customerId', auth, jsonParser, (req, res) => {
    const { params: {customerId}, body } = req
    handleErrors(async () => {
        await logic.updateCustomer(customerId, body)
        return res.status(201).json({ message: 'Ok, customer updated.' })
    }, res)
})

router.delete('/customers/:customerId', auth, jsonParser, (req, res) => {
    const { params: { customerId } } = req
    handleErrors(async () => {
        await logic.deleteCustomer(customerId)
        return res.status(201).json({ message: 'Ok, customer deleted.' })
    }, res)
})

router.post('/customers/notes/:customerId', auth, jsonParser, (req, res) => {
    const { body: { text }, params: {customerId}, userId } = req

    handleErrors( async () => {
        await logic.addCustomerNote(customerId, text, userId)
        return res.status(201).json({ message: 'Ok, a note has been added' })
    }, res)
})

router.get('/customers/notes/:customerId', auth, jsonParser, (req, res) => {
    const { params: {customerId} } = req

    handleErrors( async () => {
        const notes = await logic.listCustomerNotes(customerId)
        return res.json(notes)
    }, res)
})

router.delete('/customers/notes/:customerId', auth, jsonParser, (req, res) => {
    const { body: { noteId }, params: {customerId} } = req
    handleErrors(async () => {
        await logic.deleteCustomerNotes(customerId, noteId)
        if(noteId) return res.status(201).json({ message: 'Ok, note is deleted.' })
        return res.status(201).json({ message: 'Ok, notes are deleted.' })
    }, res)
})

router.post('/electronicmodules', auth, jsonParser, (req, res) => {
    const { body: {orderNumber,
        brand,
        model,
        cylinders,
        transmission,
        year,
        engine,
        device,
        serial,
        fail,
        owner,
        status } } = req

    handleErrors( async () => {
        await logic.registerElectronicModule(
            orderNumber,
            brand,
            model,
            cylinders,
            transmission,
            year,
            engine,
            device,
            serial,
            fail,
            owner,
            status)
        return res.status(201).json({ message: 'Ok, electronic module registered.' })
    }, res)

})

router.get('/electronicmodules', auth, jsonParser, (req, res) => {
    const { query } = req

    handleErrors( async () => {
        const electronicModules = await logic.findElectronicModules(query)
        return res.json(electronicModules)
    }, res)
})

router.put('/electronicmodules/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { params: {electronicModuleId}, body } = req
    handleErrors(async () => {
        await logic.updateElectronicModule(electronicModuleId, body)
        return res.status(201).json({ message: 'Ok, electronic module updated.' })
    }, res)
})

router.delete('/electronicmodules/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { params: { electronicModuleId } } = req
    handleErrors(async () => {
        await logic.deleteElectronicModule(electronicModuleId)
        return res.status(201).json({ message: 'Ok, electronic module deleted.' })
    }, res)
})

router.post('/electronicmodules/notes/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { body: { text }, params: {electronicModuleId}, userId } = req

    handleErrors( async () => {
        await logic.addElectronicModuleNote(electronicModuleId, text, userId)
        return res.status(201).json({ message: 'Ok, a note has been added' })
    }, res)
})

router.get('/electronicmodules/notes/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { params: {electronicModuleId} } = req

    handleErrors( async () => {
        const notes = await logic.listElectronicModuleNotes(electronicModuleId)
        return res.json(notes)
    }, res)
})

router.delete('/electronicmodules/notes/:electronicModuleId&noteId', auth, jsonParser, (req, res) => {
    const { body: { noteId }, params: { electronicModuleId } } = req
    handleErrors(async () => {
        await logic.deleteElectronicModuleNotes(electronicModuleId, noteId)
        if(noteId) return res.status(201).json({ message: 'Ok, note is deleted.' })
        return res.status(201).json({ message: 'Ok, notes are deleted.' })
    }, res)
})

router.post('/electronicmodules/budget/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { params: { electronicModuleId, body: { description, price } } } = req

    handleErrors( async () => {
        await logic.addElectronicModuleBudget(electronicModuleId, description, price)
        return res.status(201).json({ message: 'Ok, a product has been added' })
    }, res)
})

router.get('/electronicmodules/budget/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { params: {electronicModuleId} } = req

    handleErrors( async () => {
        const budget = await logic.listElectronicModuleBudgets(electronicModuleId)
        return res.json(budget)
    }, res)
})

router.delete('/electronicmodules/budget/:electronicModuleId', auth, jsonParser, (req, res) => {
    const { body: { productId }, params: {electronicModuleId} } = req
    handleErrors(async () => {
        await logic.deleteElectronicModuleBudgets(electronicModuleId, productId)
        if(productId) return res.status(201).json({ message: 'Ok, product is deleted.' })
        return res.status(201).json({ message: 'Ok, products are deleted.' })
    }, res)
})

module.exports = router
