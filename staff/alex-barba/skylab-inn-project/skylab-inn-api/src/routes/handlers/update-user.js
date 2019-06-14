
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { data } } = req

    try {
        logic.updateUser(userId, data)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}