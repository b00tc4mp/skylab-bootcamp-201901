const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { userId }, body: { data } } = req


    try {
        debugger
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