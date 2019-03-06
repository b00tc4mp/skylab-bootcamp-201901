const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { id }, userId } = req

    try {
        logic.toogleFav(userId, id)
            .then(result => res.json(result))
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