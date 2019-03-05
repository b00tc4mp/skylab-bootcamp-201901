const logic = require('../logic')

module.exports = (req, res) => {
    const { headers: { authorization }, body: { fileContent } } = req

    const token = authorization.slice(7)

    try {
        logic.createFile(token, fileContent)
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