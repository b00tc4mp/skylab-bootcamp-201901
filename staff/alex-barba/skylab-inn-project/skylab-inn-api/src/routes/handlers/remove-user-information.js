
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { infoId, type } } = req

    try {
        logic.removeUserInformation(userId, infoId, type)
            .then(id => res.json({ id }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}