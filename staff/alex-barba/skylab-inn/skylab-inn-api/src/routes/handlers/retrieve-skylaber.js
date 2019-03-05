
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { id } } = req

    try {
        logic.retrieveSkylaber(userId, id)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
