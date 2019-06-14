const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { userId }, body:{ email,password } } = req


    try {
        debugger
        logic.deleteUser(userId,email,password)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}