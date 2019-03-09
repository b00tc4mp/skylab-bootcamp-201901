const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { serviceId }, userId } = req
debugger
    try {
        logic.addUserToService(userId, serviceId)
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