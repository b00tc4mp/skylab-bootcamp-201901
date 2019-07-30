const logic = require('../logic')

module.exports = async (req, res) => {

    try {
        const games = await logic.retrieveAllGames()
        res.status(200).json(games)
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}