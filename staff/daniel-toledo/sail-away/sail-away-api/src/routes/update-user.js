const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages}} = req
    let data={pictures, name, surname, gender, nationality, birthday, description, boats, talents, experience, languages}
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