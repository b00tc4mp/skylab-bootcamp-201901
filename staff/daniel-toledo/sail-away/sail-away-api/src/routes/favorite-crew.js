const logic = require('../logic')

module.exports = (req, res) => {
    const {userId, params: { crewId } } = req
    debugger
    try {
        logic.toggleFavoriteCrew(userId, crewId)
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