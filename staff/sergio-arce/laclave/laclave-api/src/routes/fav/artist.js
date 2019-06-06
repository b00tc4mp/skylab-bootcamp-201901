const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { artistId } } = req

    try {

        logic.favArtist(artistId, userId)

            .then(() => res.json({ message: 'ok' }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}

