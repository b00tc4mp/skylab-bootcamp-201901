const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{query} , userId } = req
    try {
        debugger
        logic.listEventsByQuery(userId,query)
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

