const logic = require('../logic')


//pend userId
module.exports = async (req, res) => {
    const { body: { title, genre, description }, files, userId } = req
    try {

        let newGame = await logic.uploadGame(userId, title, genre, description, files[0], files[1])
        res.json({ newGame })

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })

    }

}