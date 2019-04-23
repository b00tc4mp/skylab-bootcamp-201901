const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { invitationId:link }, userId } = req
    
    try {
        logic.verifyNewUserLink(userId, link)
            .then((workspaceId) => res.json({ workspaceId }))
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