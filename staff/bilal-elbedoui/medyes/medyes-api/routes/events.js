const express = require('express');
const router = express.Router();
const logic = require('../logic')
const auth = require('../middleware/auth')
const handleError = require('../middleware/handle-errors')

router.post('/', auth, (req, res) => {

    debugger
    handleError(async () => {
        const { userId, orgId, body: { title, description, medicalField, eventType, location, date, numberTicketsAvailable, price, image } } = req

        const event = await logic.createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price, image)

        res.json({message: 'Post created'}) // TODO should event be returned? otherwise just return a message "Event created"
    }, res)

})

router.get('/search', auth, (req, res) => {
    handleError(async () => {
        debugger
        const { query: { field, type } } = req

        const resultSearch = await logic.retrieveEvents(field, type)

        res.json(resultSearch);
    }, res)
})


router.post('/:id', auth, (req, res) => {
    handleError(async () => {
        debugger
        const { params: { id }, userId, orgId, body: { text } } = req

        const post = await logic.addNewPost(id, userId, orgId, text)

        res.json({message: 'comment published'}) // TODO should post be returned? otherwise re-think logic, and remove it.
    }, res)
})

router.get('/:id', auth, (req, res) => {
    handleError(async () => {
        const { params: { id } } = req
        const event = await logic.retrieveOneEvent(id)
        res.send(event);
    }, res)
})

router.put('/:id', auth, (req, res) => {
    handleError(async () => {
        const { params: { id }, userId, orgId, body: { description } } = req // TODO orgId required?

        const event = await logic.updateDescriptionEvent(id, userId, description)
        debugger
        res.json(event)
    }, res)

})


module.exports = router;
