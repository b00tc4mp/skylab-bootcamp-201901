const logic = require('../logic')
const { handleHerperError } = require('./error-helper')

module.exports = (req, res) => {
    const { body: { name, surname, age, description, email, password, passwordConfirmation } } = req

    try {
        logic.registerUser(name, surname, age, description, email, password, passwordConfirmation)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}


