const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId  } = req


    try {
        logic.retrieveUser(userId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(406).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}