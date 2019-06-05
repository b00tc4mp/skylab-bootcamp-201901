const logic = require('../../logic')

module.exports = (req, res) => {

    const { userId, body } = req

    console.log(userId)
    try {

        logic.createCongress(body, userId)
            .then(response => res.json({ response }))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}