const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { title, description, maxUsers, place, time }, userId } = req
    
    try {
        logic.createService(userId, title, description, maxUsers, place, time)
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