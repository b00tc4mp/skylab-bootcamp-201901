const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')
const UnauthorizedError = require('photopin-errors')

module.exports = (req, res) => {
    handleErrors(() => {
        const { headers: { authorization }, body: { name, surname, password } } = req
        if (!authorization) throw new UnauthorizedError()

        const token = authorization.slice(7)

        if (!token) throw new UnauthorizedError()

        return logic.updateUser(token, name, surname, password)
            .then(() => res.status(200).json({ message: 'Ok, user data updated. ' }))
    }, res)
}