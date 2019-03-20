const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { name, surname, gender, nationality, birthday, description, boats, talents, experience, languages}} = req
    const data={name, surname, gender, nationality, birthday, description, boats, talents, experience, languages}

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