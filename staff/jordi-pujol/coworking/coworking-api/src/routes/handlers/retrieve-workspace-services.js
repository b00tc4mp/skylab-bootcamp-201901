const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { workspaceId }, userId } = req

    try {
        logic.retrieveWorkspaceServices(userId, workspaceId)
            .then(services => res.json({ services }))
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