const express = require('express');
const router = express.Router();
const logic = require('../logic/index')
const auth = require('../middleware/auth')
const handleError = require('../middleware/handle-errors')


router.post('/', auth, (req, res) => {

    handleError(async () => {

        const event = await logic.createEvent({sub:req.userId, subOrga:req.orgaId}, req.body)
        res.json(event)

    }, res)

})

router.get('/', auth, (req, res) => {
    handleError(async () => {

        const resultSearch = await logic.retrieveEvents(req.query)
        res.json(resultSearch);
    }, res)
})


router.post('/:id', auth, (req, res) => {
    handleError(async () => {

        const post = await logic.addNewPost(req.params.id, {sub:req.userId, subOrga:req.orgaId}, req.body)
        res.json(post)

    }, res)
})

router.get('/:id', auth, (req, res) => {
    handleError(async () => {

        const event = await logic.retrieveOneEvent(req.params.id)
        const posts = await logic.retrievePosts(req.params.id)
        res.send({ event, posts });
    }, res)
})

router.put('/:id', auth, (req, res) => {

    handleError(async () => {
        const event = await logic.updateDescriptionEvent(req.params.id, {sub:req.userId, subOrga:req.orgaId}, req.body)
        debugger
        res.json(event)
    },res )

})


module.exports = router;
