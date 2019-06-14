const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, params: { journeyId } } = req

    try {
        logic.toggleFavoriteJourney(userId, journeyId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })

    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}