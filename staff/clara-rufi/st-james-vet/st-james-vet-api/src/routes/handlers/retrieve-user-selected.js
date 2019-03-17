const logic = require('../../logic')

module.exports = (req, res) => {
    debugger
    const { userSelectedId } = req

    try {
        logic.retrieveUserSelected(userSelectedId)
            // .then(user => res.json(user))
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