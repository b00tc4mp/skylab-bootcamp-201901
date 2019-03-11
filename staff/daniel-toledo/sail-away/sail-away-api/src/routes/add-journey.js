const logic = require('../logic')
const {  mongoose: { Types: { ObjectId } }} = require('sail-away-data')

module.exports = (req, res) => {
    const { body: { title, seaId, route, dates, description, userId, boat, lookingFor } } = req
    user=ObjectId(userId) //to practice
    debugger
    try {
        return logic.addJourney(title, seaId, route, dates, description, user, boat, lookingFor )
            .then(id => res.json({ id }))

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}