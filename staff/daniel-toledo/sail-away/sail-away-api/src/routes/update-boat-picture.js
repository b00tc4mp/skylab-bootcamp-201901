
const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { boatId }} = req
    const { userId, image : {secure_url} } = req
    debugger
    try {
    logic.updateBoatPicture(userId, boatId, secure_url)
        .then(user => res.json( user ))
        .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 