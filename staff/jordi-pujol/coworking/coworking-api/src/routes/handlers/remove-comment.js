const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: {serviceId, commentId} } = req
    
    try {
        logic.removeComment(serviceId, commentId)
            .then(() => res.json({ status: 'ok' }))
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