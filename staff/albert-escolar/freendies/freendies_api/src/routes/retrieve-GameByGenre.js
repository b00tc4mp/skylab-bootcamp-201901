const logic = require('../logic')

module.exports = async (req, res) => {
    const { params: { genre } } = req

    try {
        const games = await logic.retrieveGameByGenre(genre)
        res.status(200).json(games)
        
    } catch ({message}) {
            res.status(404).json({
                error:message
            })
    }
}