const logic = require('../../logic')

module.exports = (req, res) => {
    const { body: { title, description, date, ubication , category }, userId  } = req

    try {
        logic.createEvents(userId , title, description, date, ubication , category)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}


