const logic = require("../../logic");

module.exports = (req, res) => {

    try {
        logic
            .retrieveRandomGame()
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
