
const logic = require('../../logic')

module.exports = (req, res) => {

    try {
        logic.listCongress()
            .then(congress => res.json(congress))

            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}