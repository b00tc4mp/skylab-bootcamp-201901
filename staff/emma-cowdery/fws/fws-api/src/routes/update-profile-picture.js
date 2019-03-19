const logic = require('../logic')

module.exports = (req, res) => {
    debugger
    const { userId, image: { secure_url } } = req

    try {
        logic.updateProfilePicture(userId, secure_url)
            .then(user => res.json({user}))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}