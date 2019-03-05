const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { name, user } } = req
    
    try {
        logic.addUserToWorkspace(name, user)
            .then(() => res.json({ status: 'OK' }))
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