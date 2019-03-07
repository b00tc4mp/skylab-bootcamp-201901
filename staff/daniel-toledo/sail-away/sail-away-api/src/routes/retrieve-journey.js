const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        return logic.retrieveJourney(id)
            .then(journey => res.json({ journey }))
            // .then(response => {
            //     if (response.error) res.json({error})
            //     else res.json({response.journey})
            // })

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}