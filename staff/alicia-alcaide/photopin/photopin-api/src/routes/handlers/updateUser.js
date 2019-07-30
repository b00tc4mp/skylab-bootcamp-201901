const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {
        const { userId , body } = req

        const user = await logic.updateUser(userId, body)

        return res.json(user)
        
    }, res)
}