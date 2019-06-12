
const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, params: { itemId } } = req

    try {

        logic.toggleFav(userId, itemId)

            .then(() => res.json({ message: 'ok' }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}

