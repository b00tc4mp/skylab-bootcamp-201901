const logic = require('../logic')

module.exports = (req, res) => {
    const { headers: { authorization }, query: { oldPath, newPath } } = req

    const token = authorization.slice(7)

    try {
        logic.moveDir(token, oldPath, newPath)
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