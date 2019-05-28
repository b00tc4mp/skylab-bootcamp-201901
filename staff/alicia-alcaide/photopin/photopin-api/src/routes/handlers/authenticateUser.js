require('dotenv').config()
const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET } } = process

module.exports = (req, res) => {
    const { body: { email, password } } = req

    handleErrors(async () => {
        const sub = await logic.authenticateUser(email, password)
        const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '1h' })
        return res.json({ token })
    }, res)
}