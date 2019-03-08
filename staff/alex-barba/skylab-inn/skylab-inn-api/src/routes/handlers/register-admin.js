const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm, role } } = req

    try {
        logic.registerAdmin(name, surname, email, password, passwordConfirm, role)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({ error: message })
            })
    } catch ({ message }) {
        res.status(409).json({ error: message })
    }
}