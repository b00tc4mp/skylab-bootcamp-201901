
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.retrievePendingSkylabers(userId)
            .then(preUsers => res.json({ preUsers }))
            .catch(({ message }) => {res.status(400).json({error: message})})
    } catch ({ message }) {
        res.status(400).json({error: message})
    }
}
