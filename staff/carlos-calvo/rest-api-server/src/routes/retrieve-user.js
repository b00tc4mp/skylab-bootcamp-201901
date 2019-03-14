const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.retrieveUser(id, token)
            // .then(user => res.json(user))
            .then(({id, token}) => {
                res.json({ data: {id, token }, status: 'OK' })
            })
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