const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req
    try {
        logic.updateUser(name, surname, email, password, passwordConfirm)
            .then(id => res.json({ id }))
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