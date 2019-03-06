const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: {...data}, params: { serviceId }, userId } = req

    try {
        logic.updateService(userId, serviceId, data)
            .then(() => res.json({ status: 'OK' }))
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