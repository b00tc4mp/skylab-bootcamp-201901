const logic = require('../logic')

module.exports = async (req, res) => {
    const { params: { id } } = req

    try {
        const game = await logic.retrieveGameById(id)
        res.status(200).json(game)

    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }

}