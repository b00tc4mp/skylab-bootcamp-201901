const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { title, description }, userId } = req
    
    try {
        logic.createService(userId, title, description)
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