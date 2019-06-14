const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id },body: {text}, userId } = req
    try {
        logic.sendMessage(userId,id,text)
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