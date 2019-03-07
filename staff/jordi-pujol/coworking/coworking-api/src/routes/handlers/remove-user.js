const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, body: {email} } = req

    try {
        logic.removeUser(userId, email)
            .then(() => res.json({ status: 'ok'}))
            .catch(({ message }) => {
                res.status(408).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}