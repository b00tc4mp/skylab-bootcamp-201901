const logic = require('../logic')

module.exports = (req, res) => {
    const { headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.retrieveUser(token)
            // .then(user => res.json(user))
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