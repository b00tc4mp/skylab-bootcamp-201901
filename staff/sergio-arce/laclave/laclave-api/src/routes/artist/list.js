const logic = require('../../logic')

module.exports = (req, res) => {

    try {
        logic.listArtists()
            .then(artists => res.json({ artists }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}