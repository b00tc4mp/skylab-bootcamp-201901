
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { type, data } } = req

    try {
        logic.addUserInformation(userId, type, data)
            .then(id => res.json({ id }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}