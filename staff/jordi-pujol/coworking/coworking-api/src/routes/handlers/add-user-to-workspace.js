const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { workspaceId, user } } = req
    
    try {
        logic.addUserToWorkspace(workspaceId, user)
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