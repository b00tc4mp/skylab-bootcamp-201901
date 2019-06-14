const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { title, seaId, route, dates, description, boat, lookingFor } } = req

    try {
        return logic.addJourney(title, seaId, route, dates, description, boat, lookingFor )
            .then(id => res.json({ id }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}