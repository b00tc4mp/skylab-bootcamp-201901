const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { artistId }, body: { userId, text }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.addCommentToArtist(userId, token, artistId, text)
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