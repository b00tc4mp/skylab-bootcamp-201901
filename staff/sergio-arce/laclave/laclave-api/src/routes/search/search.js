const logic = require('../../logic')

module.exports = (req, res) => {

    const { query: { q } } = req

    try {
        logic.searchItems(q)
            .then(results => res.json({ results }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
    
}
