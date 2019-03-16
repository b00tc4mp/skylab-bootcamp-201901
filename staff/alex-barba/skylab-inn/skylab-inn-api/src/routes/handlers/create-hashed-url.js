
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { skylaberIds } } = req

    try {
        logic.createHashedUrl(userId, skylaberIds)
            .then(hashedUrl => res.json({ hashedUrl }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}