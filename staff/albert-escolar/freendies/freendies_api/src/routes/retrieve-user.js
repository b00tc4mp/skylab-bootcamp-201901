const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        const user = await logic.retrieveUser(userId)
        res.json.bind(user)
        
    } catch ({ message }) {

        res.status(409).json({
            error: message
        })
    }
}

