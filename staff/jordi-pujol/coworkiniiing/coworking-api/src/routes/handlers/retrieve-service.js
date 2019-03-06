const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { serviceId }, userId } = req

    try {
        logic.retrieveService(userId, serviceId)
            .then(service => res.json({ service }))
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