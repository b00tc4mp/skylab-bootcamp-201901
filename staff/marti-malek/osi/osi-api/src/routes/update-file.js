const logic = require('../logic')

module.exports = (req, res) => {
    const { headers: { authorization }, query: { filePath }, body: { fileContent } } = req

    const token = authorization.slice(7)
    try {
        logic.updateFile(token, filePath, fileContent)
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