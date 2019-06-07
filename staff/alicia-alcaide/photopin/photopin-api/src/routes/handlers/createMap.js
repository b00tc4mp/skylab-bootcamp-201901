const logic = require('../../logic')
const handleErrors = require('../../middlewares/handle-errors')

module.exports = (req, res) => {
    const { userId, body: { title, description, coverImage, tags } } = req

    handleErrors(async () => {
        await logic.createMap(userId, title, description, coverImage, tags)

        return res.status(201).json({ message: 'Ok, map created.' })
    }, res)
}