const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{commentEvent} , userId } = req

    try {
        logic.listComments(userId , commentEvent)
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


