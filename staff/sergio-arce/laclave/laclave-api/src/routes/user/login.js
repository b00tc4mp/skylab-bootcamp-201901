const logic = require('../../logic')

module.exports = (req, res) => {

    const { body: { email, password } } = req

    try {
        logic.loginUser(email, password)
            .then(response => res.json(response))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }

}