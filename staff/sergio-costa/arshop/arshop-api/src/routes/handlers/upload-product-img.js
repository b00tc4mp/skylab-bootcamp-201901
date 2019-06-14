const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, image: { secure_url }, params: { id } } = req

    try {
        logic.uploadProductImg(userId, id, secure_url)
            .then(user => res.json(user))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 