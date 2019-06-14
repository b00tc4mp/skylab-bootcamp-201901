const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(async () => {
        await logic.registerUser(name, surname, email, password)
    
        return res.status(201).json({ message: 'Ok, user registered.' })
    }, res)
}