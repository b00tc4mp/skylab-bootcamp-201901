const logic = require('../logica');
const express = require('express');
const router = express.Router();
const handleErrors = require('../middleware/handle-errors')


router.get('/', (req, res) => {

    handleErrors(async () => {
        const fields = await logic.getAllfields()

        res.json(fields)
    }, res)
})

router.get('/:id', async (req, res) => {

    handleErrors(async() => {
        const field = await logic.getOnefield(req.params.id)
        res.json(field)
    }, res)
})

router.post('/', async (req, res) => {
    handleErrors(async () => {
        const result = await logic.createMedicalField(req.body)
        res.json(result)
    }, res)
})

module.exports = router;