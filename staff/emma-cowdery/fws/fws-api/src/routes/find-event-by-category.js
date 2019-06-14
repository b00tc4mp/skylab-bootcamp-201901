const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, params: { restaurantCategory } } = req
    
    try {
        logic.findEventByCategory(userId, restaurantCategory)
            .then(events => res.json({ events }))
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