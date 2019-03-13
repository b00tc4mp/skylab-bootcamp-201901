const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { filters } } = req
    console.log(filters)
    
    try {
        logic.filterEvents(userId, filters)
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