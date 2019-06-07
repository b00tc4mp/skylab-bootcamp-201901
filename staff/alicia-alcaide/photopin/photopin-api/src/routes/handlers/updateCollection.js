const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    handleErrors(async () => {
        const { userId, params: { id: mapId, title: collectionTitle }, body: { newtitle } } = req

        const user = await logic.updateCollection(userId, mapId, collectionTitle, newtitle)

        return res.json(user)

    }, res)
}