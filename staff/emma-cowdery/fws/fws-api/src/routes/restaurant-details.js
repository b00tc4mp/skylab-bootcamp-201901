const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { restaurantId }, userId } = req
    
    try {
        logic.restaurantDetails(restaurantId, userId)
            .then(result => res.json({ result }))
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