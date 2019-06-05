const logic = require('../../logic')

module.exports = (req, res) => {
    
    const { userId, body } = req
    try {
        logic.createArtist(body, userId)
            .then(artists => res.json({ artists }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}