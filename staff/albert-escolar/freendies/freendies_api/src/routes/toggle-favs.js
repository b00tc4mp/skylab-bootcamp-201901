const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, body: { id } } = req

    try {
        await logic.toggleFavs(userId, id)
        res.status(200).json({message:'Added to favs succesfully'})

    } catch ({ message }) {

        res.status(404).json({
            error: message
        })

    }
}