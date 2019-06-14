const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        const userFavs = await logic.retrieveFavs(userId)
        res.status(200).json(userFavs)

    } catch ({ message }) {
        res.status(404).json({
            error: message
        })

    }
}