
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { filters } } = req

    try {
        logic.adSearchSkylaber(userId, filters)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}