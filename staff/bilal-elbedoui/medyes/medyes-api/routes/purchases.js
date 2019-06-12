const express = require('express')
const router = express.Router()
const logic = require('../logic/index')
const auth = require('../middleware/auth')
const handleErrors = require('../middleware/handle-errors')

router.post('/:id', auth, (req, res) => {

    handleErrors(async () => {
        debugger
        const { params: { id }, userId, body: { numberOfticketsBoughts } } = req
        const purchase = await logic.makePurchase(id, userId, numberOfticketsBoughts)
        debugger
        res.json('Purchase done', purchase)
    }, res)

})
router.get('/', auth, (req, res) => {
    const{userId,orgaId}=req
    handleErrors(async () => {
        const purchases = await logic.retrievePurchases(userId, orgaId)
        res.json(purchases)
    })

})

module.exports = router;
