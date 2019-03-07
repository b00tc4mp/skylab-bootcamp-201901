const logic = require('../logic')

module.exports = (req, res) => {
    const { query: { query } } = req

    try {
        debugger
        return logic.searchJourneys(query)
            .then(journeys => res.json({ journeys }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}