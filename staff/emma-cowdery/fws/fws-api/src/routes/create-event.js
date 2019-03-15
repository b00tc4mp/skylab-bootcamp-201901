const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName }, params: { restaurantId }, userId } = req

    try {
        logic.createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName)
            .then(id => res.json({ id }))
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