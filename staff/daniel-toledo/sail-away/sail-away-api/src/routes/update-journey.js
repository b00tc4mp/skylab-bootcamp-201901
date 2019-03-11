const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, body: {title, seaId, route, dates, description, boat, lookingFor} } = req
    let data={title, seaId, route, dates, description, boat, lookingFor}
    
    try {
        return logic.updateJourney(id, data)
            .then(journey => res.json({ journey }))
            .catch(error => res.status(404).json({ error: error.message })) 

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}