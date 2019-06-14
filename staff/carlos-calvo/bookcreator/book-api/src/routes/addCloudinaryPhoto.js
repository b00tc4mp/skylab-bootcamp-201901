const logic = require('../logic')

module.exports = (req, res) => {

    const { userId, image : {secure_url} } = req

    try {
        logic.uploadPhoto(userId, secure_url)
            .then(url => res.json({ url }))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}