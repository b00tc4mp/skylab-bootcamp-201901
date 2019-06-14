const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, idCard, phone, adress, city, email, password, passwordConfirmation } } = req
debugger
    try {
        logic.registerUser(name, surname, idCard, phone, adress, city, email, password, passwordConfirmation)
         
            .then(id => res.json({message: 'OK'}))
            
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