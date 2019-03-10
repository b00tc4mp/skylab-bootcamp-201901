const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm, kind } } = req

    try {
        debugger
        logic.registerUser(name, surname, email, password, passwordConfirm, kind)
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