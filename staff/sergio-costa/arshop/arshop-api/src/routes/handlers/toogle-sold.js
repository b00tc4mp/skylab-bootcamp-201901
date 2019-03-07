const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, params: { id } } = req

    try {
        logic.toogleSold(userId, id)
            .then(() => res.json({status: "OK"}))
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