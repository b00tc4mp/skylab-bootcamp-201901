const logic = require('../../logic')

module.exports = (req, res) => {
    console.log(req.body)
    const { body: { name, surname, idCard, phone, adress, city, email } } = req

    try {
        logic.updateUser(name, surname, idCard, phone, adress, city, email)
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