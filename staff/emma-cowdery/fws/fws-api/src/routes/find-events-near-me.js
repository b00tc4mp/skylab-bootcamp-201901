const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { distance } } = req
    
    try {
        logic.findEventsNearMe(userId, distance)
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