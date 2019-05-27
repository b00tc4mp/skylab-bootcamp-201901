const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({ error: message })
            })
    } catch ({ message }) {
        res.status(409).json({ error: message })
    }
}

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(() =>
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user registered.' })),
        res)
})