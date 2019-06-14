const logic = require('../../logic')

module.exports = (req, res) => {
    
    const { body: { Id } } = req
    try {
        logic.deleteAppointment(Id)
         
            .then(res.json({message: 'OK'}))
            
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