const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { artistId }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.listCommentsFromArtist(token, artistId)
            .then(comments => res.json(comments))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}