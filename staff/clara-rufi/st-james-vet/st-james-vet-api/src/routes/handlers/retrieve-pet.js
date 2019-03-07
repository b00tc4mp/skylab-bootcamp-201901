const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: {petsId}  } = req

    try {
        logic.retrievePet(petsId)
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