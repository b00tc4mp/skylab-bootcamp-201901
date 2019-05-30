const logic = require('../logic');

module.exports = async (req, res) => {
    const { body: { username, email, password, passwordConfirmation } } = req

    try {
        let id = await logic.registerUser(username, email, password, passwordConfirmation)
        res.status(201).json({ message: 'registered succesfully'})
    }
    catch ({ message }) {
        res.status(409).json({
            error: message
        })

    }
}