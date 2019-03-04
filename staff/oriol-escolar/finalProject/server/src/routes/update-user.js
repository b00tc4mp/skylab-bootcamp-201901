const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body } = req

    try {
        logic.updateUser(userId,body)
            // .then(user => res.json(user))
            .then(res.json.bind(res))
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