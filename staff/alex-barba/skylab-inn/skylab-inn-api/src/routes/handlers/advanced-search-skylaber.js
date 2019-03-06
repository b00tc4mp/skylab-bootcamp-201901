
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { param } } = req

    try {
        logic.adSearchSkylaber(userId, param)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}