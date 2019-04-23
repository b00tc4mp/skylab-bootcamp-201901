const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: {serviceId}, body: { text }, userId } = req
    
    try {
        logic.createComment(userId, serviceId, text)
            .then(id => res.json({ id }))
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