const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('../middlewares/handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password, profile, country } } = req

    handleErrors( async() =>{
            await logic.registerUser(name, surname, email, password, profile, country)
            res.status(201).json({ message: 'Ok, user registered.' })
        },res)
})
router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () =>{
        const sub = await logic.authenticateUser(email, password)
            
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '7d' })

        res.json({ token })
        
    },res)
})
router.get('/users', auth, (req, res) => {
    handleErrors( async () => {
        const { userId } = req

        const user= await logic.retrieveUser(userId)
        return await res.status(200).json(user)
    },res)
})
router.put('/users', auth, jsonParser, (req, res) => {
    handleErrors(async () => {
        const {  userId , body: { name, surname, country } } = req
        await logic.updateUser(userId, name, surname, country)
        res.status(200).json({ message: 'Ok, user data updated.' })
    },res)
})
router.delete('/users',auth, (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        await logic.deleteUser(userId)
        res.status(204).json({ message: 'Ok, user deleted.' })
    },res)
})
router.get('issues/load?:q', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , query: { month } } = req
        debugger
        await logic.loadJirasByMonth(userId, month)
        res.status(200).json({ message: 'Database loaded successfully' })
    },res)
})
router.get('/issues/resolution', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , body: { issueType, country, startDate, endDate } } = req
        const issuesByResolution = await logic.retrieveIssuesByResolution(userId, issueType, country, startDate, endDate)
        return res.status(200).json(issuesByResolution)
    },res)
})

module.exports = router