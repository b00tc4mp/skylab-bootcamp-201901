const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    const { userId, body: { title, description, coverImage } } = req

    handleErrors(async () => {
        const newMapId = await logic.createMap(userId, title, description, coverImage)

        return res.status(201).json({ id: newMapId })
    }, res)
}