const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId } = req

    try {
        logic.updateUser(userId, req.body)

            .then(user => res.json(user))
            .catch(({ message }) => res.send({ error: message }))

        } catch ({ message }) {
            res.send({ error: message })
        }
    }