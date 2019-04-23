const logic = require('../logic')

module.exports = (req, res) => {
    const { body:{houseId, images, description, info, adress } } = req

    try {
        logic.updateHouse(houseId, images, description, info, adress )
            // .then(user => res.json(user))
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}