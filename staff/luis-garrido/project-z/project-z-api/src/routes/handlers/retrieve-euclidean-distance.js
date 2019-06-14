const logic = require("../../logic");

module.exports = (req, res) => {
    const {
        params: { otherUserUsername },
        userId
    } = req;

    let otherUserReviews;
    let userReviews;

    try {
        logic
            .retrieveUserByUsername(otherUserUsername)
            .then(({ reviews }) => (otherUserReviews = reviews))
            .then(() => logic.retrieveUser(userId))
            .then(({ reviews }) => (userReviews = reviews))
            .then(() => logic.retrieveEuclideanDistance(userReviews, otherUserReviews))
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
