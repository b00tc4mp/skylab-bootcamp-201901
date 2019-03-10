const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: {serviceId} } = req
    
    try {
        logic.retrieveServiceComments(serviceId)
            .then(comments => res.json({ comments }))
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