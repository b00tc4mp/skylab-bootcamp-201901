const logic = require("../../logic");

module.exports = (req, res) => {
    const { params: { limit } } = req

    try {
        logic
            .rankingGames(limit)
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
