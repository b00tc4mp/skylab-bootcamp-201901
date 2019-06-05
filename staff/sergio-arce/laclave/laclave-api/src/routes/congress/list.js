const logic = require('../../logic')

module.exports = (req, res) => {

    try {
        logic.listCongresses()
            .then(congress => res.json(congress))

            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}