const logic = require('../logic')

module.exports = async (req, res) => {
    const { body, userId } = req

    try {
        const user = await logic.updateUser(userId, body)
        res.status(200).json(user)
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}