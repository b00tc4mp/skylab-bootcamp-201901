const logic = require('../../logic')

module.exports = (req, res) => {

    const { query: { q } } = req

    try {
        logic.searchArtists(q)
            .then(artists => res.json({ results: artists }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.sed({ error: message })
    }
    
}

