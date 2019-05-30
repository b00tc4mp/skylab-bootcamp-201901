const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require ('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')


const  {env: { JWT_SECRET} } = process
const jsonParser = bodyParser.json()
const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const {body: { name, email, password} } = req
    
     handleErrors(async () =>   {      
        await logic.registerUser(name, email, password)
        return res.status(201).json({ message: 'Ok, user registered.'}), res})
    
})

router.post('/users/auth', jsonParser, (req, res) => {

    const {body: {email, password} } = req

    handleErrors(async () => {

        const sub = await logic.authenticateUser(email, password)            
        const token = jwt.sign({sub}, JWT_SECRET)
        return res.json({token})}, res)
})

router.get('/users/:id', auth, (req, res) => {
    const {params: {id : userId} } = req
    handleErrors( async () => {

        const user = await logic.retrieveUser(userId)
        return res.json(user)
    }, res)
})

router.post('/things', auth, jsonParser, (req, res) => {

    const {body: {category, description, locId}, userId} = req

    handleErrors(async () => {

        await logic.addPublicThing(category, description, userId, locId)
        return res.status(201).json({message: 'Ok, thing upload'}), res})    
})

router.get('/search/:category', auth, jsonParser, (req, res) => {
    const {params: {category}, userId} = req
    
    handleErrors(async () => {
        
        const categories = await logic.searchByCategory(userId, category)
        return res.json(categories)
    }, res)
})

router.get('/search/:location', auth, jsonParser, (req, res) => {
    
    const {params: {location}, userId} = req
    
    handleErrors(async () => {
        
        const names = await logic.searchByLocation(userId, location)
        return res.json(names)
    }, res)
})


module.exports = router