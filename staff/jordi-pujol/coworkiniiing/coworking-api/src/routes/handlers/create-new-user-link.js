const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.createNewUserLink(userId)
            .then(link => res.json({ link }))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}