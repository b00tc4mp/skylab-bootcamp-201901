const express = require('express')
// const app = express()
const router = express.Router()
const handleErrors = require('./handle-errors')
const logic = require('../logic')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// router.post('/user', (req, res) => {
//   res.send('Yei!!!')
// })

router.post('/user', jsonParser, (req, res) => {
  const { body: { name, surname, email, password } } = req

  handleErrors(async () => {
    await logic.registerUser(name, surname, email, password)

    return res.status(201).json({ message: 'User registered.' })
  }, res)
})

module.exports = router
