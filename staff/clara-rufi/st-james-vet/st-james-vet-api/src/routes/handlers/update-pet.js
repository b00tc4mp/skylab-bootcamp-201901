const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: {petsId, name, microchip, petlicence } } = req

    try {
        logic.updatePet(petsId, name, microchip, petlicence)
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