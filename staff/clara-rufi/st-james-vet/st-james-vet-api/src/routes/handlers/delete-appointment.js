const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { appointmentId } } = req
    try {
        debugger
        logic.deleteAppointment( appointmentId)
         
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