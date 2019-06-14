const logic = require('../../logic')

module.exports = (req, res) => {

    const { params: { year, month} } = req

    try {
        logic.retrieveAppointments(year, month)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}