const logic = require('../logic')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    const token = authorization.slice(7)

    try {
        logic.removeUser(token)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}