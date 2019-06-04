const logic = require('../../logic')


module.exports = (req, res) => {

    const { body : { id } } = req

    try {
        logic.deleteUser(id)

            // elimino el usuario pero el mensaje me da undefined
            
            .then(user => res.json({ message: `user whid id ${user.id} ` }))
            
            .catch(({ message }) => res.send({ error: message }))

    } catch ({ message }) {
        res.send({ error: message })
    }
}


