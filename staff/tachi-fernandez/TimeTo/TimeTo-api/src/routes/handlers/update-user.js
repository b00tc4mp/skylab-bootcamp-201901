const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name,surname,age,description,email } , userId } = req


    try {
        debugger
        logic.updateUser(userId, name,surname,age,description,email)
            .then((response) => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}