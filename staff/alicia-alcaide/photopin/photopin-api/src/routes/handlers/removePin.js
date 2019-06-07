const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {

        const { userId, params: { id: pinId } } = req

        const user = await logic.removePin(userId, pinId)

        return res.json(user)

    }, res)
}