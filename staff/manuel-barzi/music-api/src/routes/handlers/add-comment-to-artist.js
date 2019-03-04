const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { artistId }, body: { text }, userId } = req

    try {
        logic.addCommentToArtist(userId, artistId, text)
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