const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { name, surname, gender, birthday, nacionality, description, lookingFor}} = req
    let data={name, surname, gender, birthday, nacionality, description, lookingFor}
    debugger
    try {
        logic.updateUser(userId, data)
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