const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, image : {secure_url}, params: { msgId } } = req
   
    try {
    logic.uploadMessagePhoto(userId, secure_url, msgId)
        .then(user => res.json({ user }))
        .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 