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
    
     handleErrors(async () => {      
        await logic.registerUser(name, email, password)
        return res.status(201).json({ message: 'Ok, user registered.'})}, res)
    
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
        return res.status(201).json({message: 'Ok, thing upload'})}, res)    
})

router.patch('/things/update/:id', auth, jsonParser, (req, res) => {

    const {body: {status}, params: {id}, userId} = req

    handleErrors(async () => {

        await logic.updatePublicThing(userId, id, status)
        return res.status(201).json({message: 'Ok, thing update'})}, res)    
})

router.get('/search/category/:category', auth, jsonParser, (req, res) => {
    const {params: {category}, userId} = req
    
    handleErrors(async () => {
        
        const categories = await logic.searchByCategory(userId, category)
        
        return res.json(categories)
    }, res)
})

router.get('/search/locations/:location', auth, jsonParser, (req, res) => {
    
    const {params: {location}} = req
    
    handleErrors(async () => {
        
        const names = await logic.searchByLocation(location)
        
        return res.json(names)
    }, res)
})

router.get('/search/user/things', auth, jsonParser, (req, res) => {
    
    const { userId } = req
    handleErrors( async () => {
        
        const user = await logic.retrivePrivateThings(userId)
        return res.json(user)
    }, res)
})

router.get('/thing/:id', auth, jsonParser, (req, res) => {
    
    const {params: {id} } = req

    handleErrors( async () => {

        const thing = await logic.retrieveThing(id)
      
        return res.json(thing)
    }, res)
})


module.exports = router