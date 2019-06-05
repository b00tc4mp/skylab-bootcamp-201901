const logic = require('../../logic')

module.exports = (req, res) => {

    // gracias al body parser => req.body.name ...
    const { body: { name, username, email, password, congresses, favartists } } = req

    try {
        logic.registerUser(name, username, email, password, congresses, favartists)
            .then(userId => res.json({ userId }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}