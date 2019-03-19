const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, model } = req

    try {
        logic.saveObject(userId, id, secure_url)
            .then(user => res.json(user))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 