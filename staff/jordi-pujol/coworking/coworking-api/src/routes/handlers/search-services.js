const logic = require('../../logic')

module.exports = (req, res) => {
    const { userId, query: {q} } = req

    console.log(userId + 'userid')
    console.log(q + 'query')

    try {
        logic.searchServices(userId, q)
            .then(services => res.json({services}))
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