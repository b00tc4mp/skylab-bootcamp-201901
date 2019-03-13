const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { owner, pet, date} } = req
    try {
        const _date = new Date(date)        
        logic.assignAppointment(owner, pet, _date)

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