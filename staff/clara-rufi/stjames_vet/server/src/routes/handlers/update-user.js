const logic = require('../../logic')

module.exports = (req, res) => {
    console.log(req.body)
    const { body: { name, surname, idCard, phone, adress, city, email, password } } = req

    try {
        logic.updateUser(name, surname, idCard, phone, adress, city, email, password)
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