
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, file: { buffer } } = req

    try {
        logic.updateUserPhoto(userId, buffer)
            .then(user => res.json({ user }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}