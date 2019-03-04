const logic = require('../logic')

module.exports = (req, res) => {
    const { body:{data}, userId } = req

    try {
        logic.updateUser(userId,data)
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