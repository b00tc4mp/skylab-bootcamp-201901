const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {

        const { userId, params: { id: mapId } } = req

        const user = await logic.removeMap(userId, mapId)

        return res.json(user)

    }, res)
}