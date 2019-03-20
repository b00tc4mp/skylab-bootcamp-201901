const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { eventId }, body:{ text }, userId } = req


    try {
        debugger
        logic.addComment(userId,eventId,text)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}