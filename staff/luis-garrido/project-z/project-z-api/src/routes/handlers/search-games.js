const logic = require('../../logic')

module.exports = (req, res) => {
    const { query: { q } } = req

    try {
        logic.searchGames(q)
            // .then(games => res.json(games))
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}