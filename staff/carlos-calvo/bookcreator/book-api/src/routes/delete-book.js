const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { id } } = req

    try {
        logic.deleteBook(id)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                console.log(message)
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        console.log(message)
        res.status(409).json({
            error: message
        })
    }
}