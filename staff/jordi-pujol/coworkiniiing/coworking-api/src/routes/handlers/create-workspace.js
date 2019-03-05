const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { name, user } } = req
    
    try {
        logic.createWorkspace(name, user)
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