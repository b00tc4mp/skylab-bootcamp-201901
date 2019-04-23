const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { workspaceId }, userId } = req
    
    try {
        logic.addUserToWorkspace(workspaceId, userId)
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