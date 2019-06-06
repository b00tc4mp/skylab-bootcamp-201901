const logic = require('../logic');
const express = require('express');
const handleErrors = require('../middleware/handle-errors')
const router = express.Router();

router.get('/', async (req, res) => {
    handleErrors(async()=>{
        const eventType = await logic.getAllEventType();
        res.json(eventType);
    },res)
})

router.get('/:id', async (req,res) => {
    handleErrors(async()=> {
        const eventType = await logic.getOneEventType(req.params.id)
        res.json(eventType);
    },res)
})

router.post('/', async (req,res)=> {
    debugger
    handleErrors(async()=>{
        const result = await logic.createEventType(req.body)
        res.json(result);
    },res)

})

module.exports=router;
