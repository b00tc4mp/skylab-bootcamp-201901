const logic = require('../../logic')

module.exports = (req, res) => {

    try {
        logic.createArtist(req.body)
            .then(response => res.json({ response }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}


