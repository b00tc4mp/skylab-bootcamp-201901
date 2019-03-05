const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details } } = req
    try {
        debugger
        logic.registerPet(name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
         
            .then(id => res.json({message: 'OK'}))
            
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