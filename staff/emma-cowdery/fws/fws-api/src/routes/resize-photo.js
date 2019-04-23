const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { photoReference }, userId } = req
    
    try {
        logic.resizePhoto(photoReference, userId)
            .then(result => res.json({ result }))
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