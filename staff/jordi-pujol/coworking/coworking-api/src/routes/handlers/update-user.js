const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { ...data }, userId } = req

    try {
        logic.updateUser(userId, data)
            .then(() => res.json({ status:'OK' }))
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