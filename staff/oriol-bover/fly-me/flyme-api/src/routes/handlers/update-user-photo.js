'use strict'

const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, image: { secure_url } } = req

    try {
        logic.updateUserPhoto(userId, secure_url)
            .then(res.json.bind(res))
            .catch(({ message }) => { res.status(400).json({ error: message }) })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
} 