
const logic = require('../../logic')

module.exports = (req, res) => {
    debugger
    const { params: { emailToken } } = req

    try {
        logic.verifyEmail(emailToken)
            .then(id => res.json({ id }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}