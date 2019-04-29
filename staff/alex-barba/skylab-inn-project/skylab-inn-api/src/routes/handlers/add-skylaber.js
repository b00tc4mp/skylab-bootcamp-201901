
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: { data } } = req

    try {
        logic.addSkylaber(userId, data)
            .then(id => res.json({ id }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}