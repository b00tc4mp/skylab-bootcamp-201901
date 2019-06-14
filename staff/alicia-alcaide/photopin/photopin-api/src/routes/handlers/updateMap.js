const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id : mapId } , body } = req

        const user = await logic.updateMap(userId, mapId, body)

        return res.json(user)
        
    }, res)
}