const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic/index')
const handleErrors = require ('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')


const  {env: { JWT_SECRET} } = process

const jsonParser = bodyParser.json

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const {body: { name, email, password} } = req

     handleErrors(() => {
        
        logic.registerUser({name, email, password})
            .then(() => res.status(201).json({ message: 'Ok, user registered.'}), res)
    })
})

router.post('/users/auth', jsonParser, (req, res) => {

    const {body: {email, password} } = req

    handleErrors(() => 

        logic.authenticateUser(email, password)
            .then(sub  => {
                const token = jwt.sign({sub}, JWT_SECRET)
                res.json({token})
            }), res)
})

router.get('./users', auth, (req, res) => {
    handleErrors(() => {
        const {userId} = req

        return logic.registerUser(userId)
            .then(user => res.json(user))
    }, res)
})

module.exports = router