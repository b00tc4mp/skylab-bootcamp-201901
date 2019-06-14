const logic = require('../logic')

module.exports = (req, res) => {
    const { userId } = req
    
    try {
        logic.dontShowHowTo(userId)
            .then(howTo => res.json({ howTo }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}