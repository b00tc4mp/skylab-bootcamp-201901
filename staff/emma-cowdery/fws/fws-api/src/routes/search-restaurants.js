const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { query }, userId} = req
    
    try {
        logic.searchRestaurants(query, userId)
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