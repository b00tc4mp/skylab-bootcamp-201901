const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { gameId } } = req

    try {
        logic.retrieveGameInfo(gameId)
            .then(gameInfo => res.json(gameInfo))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}