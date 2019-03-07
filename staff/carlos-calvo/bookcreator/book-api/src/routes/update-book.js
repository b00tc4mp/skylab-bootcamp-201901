const logic = require('../logic')

module.exports = (req, res) => {
    const { userId , body : {title, parameters, id} } = req

    try {
        logic.updateBook(title, parameters, id, userId)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}