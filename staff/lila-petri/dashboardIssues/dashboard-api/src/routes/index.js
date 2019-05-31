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
router.get('/issues/load', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , query: { month } } = req
        await logic.loadJirasByMonth(userId, month)
        res.status(200).json({ message: 'Database loaded successfully' })
    },res)
})
router.put('/issues/overdue', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId  } = req
        await logic.calculateOverdue(userId)
        res.status(200).json({ message: 'Database updated successfully' })
    },res)
})
router.put('/issues/cleanup', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId  } = req
        await logic.clearUp(userId)
        res.status(200).json({ message: 'Database cleaned successfully' })
    },res)
})
router.get('/issues/resolution', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , query: { issueType, country, startDate, endDate } } = req
        const issuesByResolution = await logic.retrieveIssuesByResolution(userId, issueType, country, startDate, endDate)
        return res.status(200).json(issuesByResolution)
    },res)
})
router.get('/issues/sla', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , query: { issueType, country, startDate, endDate } } = req
        const issuesBySLA = await logic.retrieveIssuesBySLA(userId, issueType, country, startDate, endDate)
        return res.status(200).json(issuesBySLA)
    },res)
})
router.get('/issues/table', auth, (req, res)=>{
    handleErrors(async () => {
        const {  userId , query: { country, startDate, endDate } } = req
        const table = await logic.retrieveIssuesByTable(userId, country, startDate, endDate)
        return res.status(200).json(table)
    },res)
})

module.exports = router