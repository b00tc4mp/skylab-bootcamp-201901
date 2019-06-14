const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { id } } = req

    const object3d = req.file.buffer

    try {
        logic.saveObject3d(userId, id, object3d)
            .then(model => res.json(model))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 