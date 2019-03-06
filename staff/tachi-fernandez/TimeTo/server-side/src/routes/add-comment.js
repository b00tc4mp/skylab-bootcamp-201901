const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { eventId }, body:{ text,date }, userId } = req


    try {
        debugger
        logic.addComment(userId,eventId,text,date)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}