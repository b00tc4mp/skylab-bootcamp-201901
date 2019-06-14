const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    const { userId, body: { title }, params: { id: mapId } } = req

    handleErrors(async () => {
        await logic.createCollection(userId, mapId, title)

        return res.status(201).json({ message: 'Ok, collection created' })
    }, res)

}