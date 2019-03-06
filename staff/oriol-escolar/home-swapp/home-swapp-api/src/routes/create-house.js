const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { ownerId, images, description, info, adress } } = req

    try {
        logic.createHouse(ownerId,images,description,info,adress)
            .then(id => res.json({ id }))
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