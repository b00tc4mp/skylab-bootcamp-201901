const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')
const express = require('express')

const { env: { JWT_SECRET } } = process
const router = express.Router()

router.post('/users', (req, res) => {
    const { body: { name, surname, username, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, username, email, password)
        return res.status(201).json({ message: 'Ok, user registered.' })
    },
        res)
})

router.post('/users/auth', (req, res) => {
    const { body: { username, password } } = req

    handleErrors(async () => {
        const sub = await logic.authenticateUser(username, password)

        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })
        return res.json({ token })
    },
        res)
})


router.get('/users', auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req
        const user = await logic.retrieveUser(userId)
        return res.json(user)
    },
        res)
})

router.delete('/users', auth, (req, res) => {
    const { userId, body: { password } } = req

    handleErrors(async () => {
        await logic.deleteUser(userId, password)
        return res.status(201).json({ message: 'User Deleted' })
    },
        res)
})

router.put('/users', auth, (req, res) => {
    handleErrors(() => {
        debugger
        const { userId, body: { name, surname, username, email, password } } = req
        return logic.updateUser(userId, { name, surname, username, email, password })
            .then(user => res.json(user))
    },
        res)
})

router.get('/users/presentations', auth, (req, res) => {
    const { userId } = req
    handleErrors(async () => {
        const presentations = await logic.retrievePresentations(userId)
        return res.json(presentations)
    },
        res)
}),

router.post('/presentations', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { title } } = req
        debugger
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


router.post('/presentations/slides/style', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, slideId, style } } = req

        return logic.updateSlideStyle(userId, presentationId, slideId, style)
            .then(() => res.status(201).json({ message: 'Ok, style updated.' }))
    },
        res)
})

router.post('/presentations/slides', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, style } } = req
        return logic.createSlide(userId, presentationId, style)
            .then(() => res.status(201).json({ message: 'Ok, style updated.' }))
    },
        res)
})

router.put('/presentations/slides', auth, (req, res) => {
    handleErrors(() => {
        const { userId, body: { presentationId, updateSlides, updateElements } } = req

        return logic.updateSlide(userId, presentationId, updateSlides, updateElements)
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
        const { userId, body: { presentationId, slideId, style, type, content } } = req

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