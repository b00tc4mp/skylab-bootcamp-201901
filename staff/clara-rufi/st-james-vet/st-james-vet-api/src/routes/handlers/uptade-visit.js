const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: {petsId, vaccionations, controls, details } } = req

    try {
        logic.updateVisit(petsId, vaccionations, controls, details)
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