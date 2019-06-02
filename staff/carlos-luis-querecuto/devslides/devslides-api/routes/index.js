const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const express = require('express')

const { env: { JWT_SECRET } } = process
const router = express.Router()

router.post('/users', (req, res) => {
    const { body: { name, surname, username, email, password } } = req

    handleErrors(() =>
        logic.registerUser(name, surname, username, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user registered.' })),
        res)
})

router.post('/users/auth', (req, res) => {
    const { body: { username, password } } = req

    handleErrors(() =>
        logic.authenticateUser(username, password)
            .then(sub => {
                const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })
                res.json({ token })
            }),
        res)
})

router.get('/users', auth, (req, res) => {
    handleErrors(() => {
        const { userId } = req

        return logic.retrieveUser(userId)
            .then(user => res.json(user))
    },
        res)
})

router.put('/users', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { name, surname, username, email, password } } = req

        return logic.updateUser(userId, { name, surname, username, email, password })
            .then(user => res.json(user))
    },
        res)
})


router.post('/presentations', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { title } } = req

        return logic.createPresentation(userId, title)
            .then(() => res.json({ message: `Created new presentation ${title}` }))
    },
        res)
})

router.delete('/presentations', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId } } = req

        return logic.deletePresentation(userId, presentationId)
            .then(() => res.json({ message: `presentation deleted` }))
    },
        res)
})

router.get('/presentations/:presentationId', auth, (req, res) => {
    handleErrors(() => {
        const { userId, params: { presentationId } } = req

        return logic.retrievePresentation(userId, presentationId)
            .then(presentations => res.json(presentations))
    },
        res)
})

router.put('/presentations', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, title } } = req

        return logic.updatePresentationTitle(userId, presentationId, title)
            .then(() => res.json({ message: `title is now ${title}` }))
    },
        res)
})


router.get('/presentations/slides/style', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, slideId } } = req

        return logic.updateSlideStyle(userId, presentationId, slideId)
            .then(() => res.status(201).json({ message: 'Ok, style updated.' }))
    },
        res)
})

router.post('/presentations/slides', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { id, style } } = req
        return logic.createSlide(userId, id, style)
            .then(() => res.status(201).json({ message: 'Ok, style updated.' }))
    },
        res)
})

router.put('/presentations/slides', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, style } } = req

        return logic.updateSlide(userId, presentationId, style)
            .then(() => res.status(201).json({ message: 'Ok, slide updated.' }))
    },
        res)
})

router.delete('/presentations/slides', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, slideId } } = req

        return logic.deleteSlide(userId, presentationId, slideId)
            .then(() => res.status(201).json({ message: 'Ok, slide updated.' }))
    },
        res)
})

router.post('/presentations/slides/element', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, slideId } } = req

        return logic.createElement(userId, presentationId, slideId, style, type, content)
            .then(() => res.status(201).json({ message: 'Ok, element created.' }))
    },
        res)
})

router.delete('/presentations/slides/element', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, slideId, elementId } } = req

        return logic.deleteElement(userId, presentationId, slideId, elementId)
            .then(() => res.status(201).json({ message: 'Ok, element deleted.' }))
    },
        res)
})
// TODO other routes (update, delete...)

module.exports = router