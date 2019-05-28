const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {
        const { userId } = req

        const user = await logic.retrieveUser(userId)

        return res.json(user)
    }, res)
}