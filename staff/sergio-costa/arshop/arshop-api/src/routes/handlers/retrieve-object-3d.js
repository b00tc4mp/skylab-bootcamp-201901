const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveObject3d(id)
            .then(obj => obj.pipe(res))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 