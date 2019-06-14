const logic = require('../logic')

module.exports = (req, res) => {
    const { body: {images, description, info, adress }, userId } = req

    try {
        logic.createHouse(userId,images,description,info,adress)
            .then(house => res.json(house))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}