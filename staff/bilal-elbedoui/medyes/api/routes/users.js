const auth= require('../middleware/auth')
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const logic = require('../logica');
const handleErrors = require('../middleware/handle-errors')

router.get('/me', auth, (req, res) =>{

    handleErrors(async() => {
        const { userId } = req
        const user = await logic.retrieveUser(userId)
        
        res.json(user);
        
    }, res)

})

router.post('/', (req,res) => {
    
    handleErrors(async() => {
        
        await logic.createUser(req.body);
        
        //const token = user.generateAuthToken();
        /*header('x-auth-token', token).*/res.json(/*lodash.pick(user,['_id','fullname', 'email'] )*/{message: 'Registered correctly...'});

    }, res)  
})

router.post('/auth', (req,res) =>{

    handleErrors(async()=> {
        debugger
        const user = await logic.authenticateUser(req.body);
        const {sub, subOrga} = user
        let token
        if(sub & !subOrga){
            token = jwt.sign({sub} , config.get('jwtPrivateKey'));
        }else{
            token = jwt.sign({sub, subOrga} , config.get('jwtPrivateKey'));
        }
        res.json({message: 'You are logged...', token})
    }, res)
    
})

module.exports=router;