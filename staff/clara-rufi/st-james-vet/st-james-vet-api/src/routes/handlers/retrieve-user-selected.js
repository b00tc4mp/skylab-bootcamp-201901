const logic = require('../../logic')

module.exports = (req, res) => {
    const { userSelectedId } = req.params

    try {
        logic.retrieveUserSelected(userSelectedId)
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