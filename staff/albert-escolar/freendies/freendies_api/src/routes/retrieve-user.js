const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        const user = await logic.retrieveUser(userId)
        res.status(200).json(user)
        
    } catch ({ message }) {

        res.status(409).json({
            error: message
        })
    }
}
