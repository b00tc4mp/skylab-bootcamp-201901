const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { owner, pet, dayDb} } = req
    try {
        debugger
        logic.assignAppointment(owner, pet, new Date(dayDb))
        // logic.assignAppointment(owner, pet, dayDb)
         
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