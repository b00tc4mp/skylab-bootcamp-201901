const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { artistId }, body: { text }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.addCommentToArtist(token, artistId, text)
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