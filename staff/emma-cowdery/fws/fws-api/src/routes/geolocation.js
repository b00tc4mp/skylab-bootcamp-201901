const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req
    
    try {
        logic.geolocation(userId)
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