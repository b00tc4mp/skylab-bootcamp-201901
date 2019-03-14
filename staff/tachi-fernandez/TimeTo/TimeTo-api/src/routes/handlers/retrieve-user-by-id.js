const logic = require('../../logic')

module.exports = (req, res) => {
    const { params:{userName} , userId  } = req


    try {
        debugger
        logic.retrieveUserById(userName,userId)
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