
const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.retrieveUnverifiedEmails(userId)
            .then(unverified => res.json({ unverified }))
            .catch(({ message }) => {res.status(400).json({error: message})})
    } catch ({ message }) {
        res.status(400).json({error: message})
    }
}
