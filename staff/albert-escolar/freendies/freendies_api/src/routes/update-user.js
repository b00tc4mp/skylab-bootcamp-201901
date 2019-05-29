const logic = require('../logic')

module.exports = async (req, res) => {
    const { body: { data }, userId } = req

    try {
        const user = await logic.updateUser(userId, data)
        res.status(200).json(user)
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}