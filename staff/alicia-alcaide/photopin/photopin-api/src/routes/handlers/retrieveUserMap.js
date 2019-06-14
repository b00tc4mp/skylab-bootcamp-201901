const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id : mapId } } = req

        const map = await logic.retrieveUserMap(userId, mapId)

        return res.json(map)
    }, res)
}