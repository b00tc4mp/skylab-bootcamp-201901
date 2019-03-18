const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { about, instagram, twitter, facebook } } = req
    try {
        logic.updateUser(userId, about, instagram, twitter, facebook)
            .then(user => res.json({ user }))
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