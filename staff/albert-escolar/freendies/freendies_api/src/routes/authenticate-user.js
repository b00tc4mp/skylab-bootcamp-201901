
const logic = require('../logic')

const { createToken } = require('../token-helper')

module.exports = async (req, res) => {
    const { body: { email, password } } = req

    try {
        let userId = await logic.authenticateUser(email, password)
        const token = createToken(userId)
        res.json({ token })

    } catch ({ message }) {
        res.status(401).json({ error: message })
    }

}
