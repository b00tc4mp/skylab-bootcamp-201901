const logic = require('../../logic')


module.exports = (req, res) => {

    const { params: { id } } = req

    try {
        logic.retrieveCongress(id)

            .then(consgress => res.json(consgress))
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {

        res.send({ error: message })
    }


}