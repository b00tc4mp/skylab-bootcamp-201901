const logic = require('../logic')

module.exports = (req, res) => {
    const { image, error } = req

    if (image)
        res.json(image)
    else {
        res.status(409).json({

            error: error
        })
    }


}