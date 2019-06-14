const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {

        const { userId, params: { id: mapId, title: collectionTitle } } = req

        const user = await logic.removeCollection(userId, mapId, collectionTitle)

        return res.json(user)

    }, res)
}