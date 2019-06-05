const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.deleteUser(id)

            .then(user => res.json({ message: `user whith id ${user.id} deleted` }))

            .catch(({ message }) => res.send({ error: message }))

        } catch ({ message }) {
            res.send({ error: message })
        }
    }