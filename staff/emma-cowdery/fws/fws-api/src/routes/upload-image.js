const logic = require('../logic')

module.exports = (req, res) => {
    const { userId, body: { file } } = req
    
    try {
        logic.uploadImage(userId, file)
            .then(url => res.json({ url }))
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