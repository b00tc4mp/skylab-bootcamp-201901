const logic = require('../../logic')

const { createToken } = require('../../token-helper')

module.exports = (req, res) => {
    
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(({id, role}) => {
                const token = createToken(id)
            
                res.json({ token, role })
            })
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