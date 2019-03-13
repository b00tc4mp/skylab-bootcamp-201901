const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{eventId} , userId} = req
    try {
        debugger
        logic.toogleEvent(userId, eventId)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}

