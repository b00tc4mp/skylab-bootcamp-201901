const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { name, username, email, password } } = req

    try {
        logic.registerUser(name, username, email, password)
            .then(userId => res.json({ userId }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}