const logic = require('../../logic')

module.exports = (req, res) => {
    console.log(req.body)
    const { body: { petsId, name, microchip, petlicence, neutered } } = req

    try {
        logic.updatePet(petsId, name, microchip, petlicence, neutered)
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