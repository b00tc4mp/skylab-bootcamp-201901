const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { owner, pet, year, month, day, hour } } = req
    try {
        debugger
        logic.assignAppointment(owner, pet, year, month, day, hour)
         
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