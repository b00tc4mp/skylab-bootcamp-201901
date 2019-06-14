const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { boat } } = req

    try {
        logic.updateBoat(userId, boat)
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