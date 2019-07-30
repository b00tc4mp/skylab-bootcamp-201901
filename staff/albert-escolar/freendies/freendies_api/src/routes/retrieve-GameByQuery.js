const logic = require('../logic')

module.exports = async (req, res) => {
    const { params: { genre, query } } = req
    try {
        const games = await logic.retrieveGameByQuery(genre, query)
        res.status(200).json(games)
    } catch ({ message }) {

        res.status(404).json({
            error: message
        })

    }


}