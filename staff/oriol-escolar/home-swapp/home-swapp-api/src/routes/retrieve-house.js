const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { houseId } } = req
    try {
        logic.retrieveHouse(houseId)
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