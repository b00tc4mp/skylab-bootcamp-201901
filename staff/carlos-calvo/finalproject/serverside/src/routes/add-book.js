const logic = require('../logic')

module.exports = (req, res) => {
    const { body: {title, content, coverphoto, images, parameters, userId} } = req
    console.log(123)
    try {
        logic.addBook(title, content, coverphoto, userId, images, parameters)
            .then(book => {
                console.log(title)
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