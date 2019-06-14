const logic = require("../../logic");

module.exports = (req, res) => {
    const {
        params: { gameId },
        body,
        userId
    } = req;

    try {
        logic
            .postReview(userId, gameId, body)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                });
            });
    } catch ({ message }) {
        res.status(409).json({
            error: message
        });
    }
};
