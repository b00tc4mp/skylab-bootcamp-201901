const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, userName ,age, description, email, password, passwordConfirmation } } = req

    try {
        debugger
        logic.registerUser(name, surname, userName , age, description, email, password, passwordConfirmation)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}


