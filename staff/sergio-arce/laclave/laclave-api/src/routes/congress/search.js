const logic = require('../../logic')

module.exports = (req, res) => {
    const { query: { q } } = req

    try {
        logic.searchCongresses(q)
            .then(congresses => res.json({ results: congresses }))
            .catch(({message}) => res.send({ error: message }))


    } catch ({ message }) {
        res.send({ error: message })
    }
}