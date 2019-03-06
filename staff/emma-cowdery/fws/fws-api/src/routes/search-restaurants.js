const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { query } } = req
    
    try {
        logic.searchRestaurants(query)
            .then(results => res.json({ results }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}