const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        const userUploads = await logic.retrieveUploads(userId)
        res.status(200).json(userUploads)

    } catch ({ message }) {
        res.status(404).json({
            error: message
        })

    }
}