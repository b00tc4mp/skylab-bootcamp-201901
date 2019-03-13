const logic = require('../logic')

module.exports = (req, res) => {
    const { body: {id} } = req

    try {
        logic.addBookToTemplates(id)
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