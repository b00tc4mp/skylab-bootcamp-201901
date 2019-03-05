const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { ...data } } = req

    try {
        logic.updateUser(data)
            .then(token => res.json({ token }))
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