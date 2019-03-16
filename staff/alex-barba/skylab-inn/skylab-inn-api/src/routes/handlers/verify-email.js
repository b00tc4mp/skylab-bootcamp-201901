
const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { emailToken } } = req

    try {
        logic.verifyEmail(emailToken)
            .then(res => res.json({ res }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}