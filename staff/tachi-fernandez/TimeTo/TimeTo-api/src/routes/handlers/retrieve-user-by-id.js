const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{otherUserId} , userId  } = req


    try {
        debugger
        logic.retrieveUserById(otherUserId,userId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}