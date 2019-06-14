const logic = require('../logic')

module.exports = (req, res) => {
    const { body: {houseId}, userId } = req

    try {
        logic.toggleFavorites(userId,houseId)
            .then(user => res.json(user))
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