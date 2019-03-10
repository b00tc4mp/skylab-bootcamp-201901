const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, body: {sea, route, dates, description} } = req

    try {
        return logic.updateJourney(id, sea, route, dates, description)
            .then(journey => res.json({ journey }))
            .catch(error => res.status(404).json({ error: error.message })) 

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}