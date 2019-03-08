const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { name }, userId } = req
    
    try {
        logic.createWorkspace(name, userId)
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