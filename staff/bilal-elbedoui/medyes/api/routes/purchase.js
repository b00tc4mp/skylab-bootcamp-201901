const express=require('express')
const router = express.Router()
const logic = require('../logica/index')
const auth = require('../middleware/auth')
const handleErrors = require('../middleware/handle-errors')

router.post('/:id', auth, (req,res) => {

    handleErrors(async() =>{
        debugger
       
       const purchase = await logic.makePurchase(req.params.id, req.userId, req.body)
        debugger
       res.json('Purchase done', purchase)
    }, res)

})
router.get('/', auth, (req,res) =>{

    handleErrors(async() =>{
        const purchases = await logic.retrievePurchases({sub:req.userId, subOrga:req.orgaId})
        res.json(purchases)
    })

})

module.exports=router;