const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { title, description, date, ubication , category }, params:{id}  } = req

    try {
        logic.createEvents(id , title, description, date, ubication , category)
            .then(response => res.json(response))
            .catch(({ message }) => {
                res.status(402).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(403).json({
            error: message
        })
    }
}


