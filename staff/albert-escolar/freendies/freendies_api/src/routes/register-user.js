const logic = require('../logic');

module.exports = async (req, res) => {
    const { body: { username, email, password, passwordConfirm } } = req

    try {
        let id = await logic.registerUser(username, email, password, passwordConfirm)
        res.json({ id })
    }
    catch ({ message }) {
        res.status(409).json({
            error: message
        })

    }


}