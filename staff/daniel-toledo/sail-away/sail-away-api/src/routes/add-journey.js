const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { route, dates, description }} = req

    try {
        let id= logic.addJourney(route, dates, description)
        res.json({ id })

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}