
const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { ids } } = req

    try {
        logic.retrieveEncryptedIds(ids)
            .then(skylabers => res.json({ skylabers }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}
