
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { query } } = req

    try {
        logic.searchSkylaber(userId, query)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}