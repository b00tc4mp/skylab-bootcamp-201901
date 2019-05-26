const logic = require('../logic')

module.exports = async (req, res) => {
    const { body: { title, genre, description, images, gameFile }, userId } = req
    try {

        let newGame = await logic.uploadGame(userId, title, genre, description, images, gameFile)
        res.json({ newGame })

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })

    }

}