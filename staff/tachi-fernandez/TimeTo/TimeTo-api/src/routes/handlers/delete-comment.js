const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{eventId,commentId} , userId } = req

    try {
        logic.deleteComment(userId,eventId,commentId)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}


