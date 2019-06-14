const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.retrieveUserSubmitedEvents(userId)
            .then(services => res.json({ services }))
            .catch(({ message }) => {
                res.status(402).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}