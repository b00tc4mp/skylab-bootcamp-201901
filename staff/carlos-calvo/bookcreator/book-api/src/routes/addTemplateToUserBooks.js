const logic = require('../logic')

module.exports = (req, res) => {
    const { body: {id}, userId } = req

    try {
        console.log(id, userId)
        logic.addTemplateToUserBooks(id, userId)
            .then(book => {
                return res.json({ book })})
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