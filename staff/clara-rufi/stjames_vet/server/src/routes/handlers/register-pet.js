const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details } } = req
    try {
        debugger
        logic.registerPet(owner, name, specie, breed, color, gender, birthdate, microchip, petlicence, neutered, vaccionations, controls, details)
         
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