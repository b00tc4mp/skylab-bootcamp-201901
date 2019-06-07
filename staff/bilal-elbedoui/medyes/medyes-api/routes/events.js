const express = require('express');
const router = express.Router();
const logic = require('../logic')
const auth = require('../middleware/auth')
const handleError = require('../middleware/handle-errors')

router.post('/', auth, (req, res) => {

    handleError(async () => {
        const { userId, orgId, body: { title, description, medicalField, eventType, location, date, numberTicketsAvailable, price } } = req

        const event = await logic.createEvent(userId, orgId, title, description, medicalField, eventType, location, date, numberTicketsAvailable, price)

        res.json(event) // TODO should event be returned? otherwise just return a message "Event created"
    }, res)

})

router.get('/', auth, (req, res) => {
    handleError(async () => {
        const { query: { medicalField, eventType } } = req

        const resultSearch = await logic.retrieveEvents(medicalField, eventType)

        res.json(resultSearch);
    }, res)
})


router.post('/:id', auth, (req, res) => {
    handleError(async () => {
        const { params: { id }, userId, orgId, body: { text } }

        const post = await logic.addNewPost(id, userId, orgId, text)

        res.json(post) // TODO should post be returned? otherwise re-think logic, and remove it.
    }, res)
})

router.get('/:id', auth, (req, res) => {
    handleError(async () => {
        const { params: { id } } = req
        const event = await logic.retrieveOneEvent(id)
        const posts = await logic.retrievePosts(id) // TODO should not be comments separated from event. they are embed (check the models).
        res.send({ event, posts });
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
