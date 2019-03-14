const logic = require('../../logic')

module.exports = (req, res) => {
    const { image  , userId } = req
    try {
        debugger
        logic.updateImage(userId, image.secure_url)
            .then((response) => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}