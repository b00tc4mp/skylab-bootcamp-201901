const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, userName, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(name, surname, userName, email, password, passwordConfirm)
            .then(id => res.json({ id }))
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