const logic = require('../../logic')


module.exports = (req, res) => {

    const { body: { id } } = req
    try {
        logic.deleteCongress(id)
            .then(congress => res.json(congress))

            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}