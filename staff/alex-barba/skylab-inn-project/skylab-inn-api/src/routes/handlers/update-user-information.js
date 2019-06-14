
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { infoId, type, data } } = req

    try {
        logic.updateUserInformation(userId, infoId, type, data)
            .then(id => res.json({ id }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}