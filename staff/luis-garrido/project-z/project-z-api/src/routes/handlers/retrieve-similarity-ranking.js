const logic = require("../../logic");
const { handleResponseError } = require("../route-helper");

module.exports = (req, res) => {
    const { userId } = req;

    let allUsers
    let userReviews;
    let similarityList = [];

    try {
        logic.retrieveAllUsers()
            .then(res => allUsers = res)
            .then(() => logic.retrieveUser(userId))
            .then(({ reviews }) => (userReviews = reviews))
            .then(() => {
                allUsers.forEach(user => {
                    const { euclideanSimilarity, userComparing } = logic.retrieveEuclideanDistance(userReviews, user.reviews)
                    if (euclideanSimilarity !== 2 && user._id.toString() !== userId)
                        similarityList.push({ euclideanSimilarity, userComparing, usernameComparing: user.username })
                })
                similarityList.sort((a, b) => b.euclideanSimilarity - a.euclideanSimilarity)
            })
            .then(() => { return { allUsers, similarityList}})
        // logic
        //     .retrieveUserByUsername(otherUserUsername)
        //     .then(({ reviews }) => (otherUserReviews = reviews))
            
        //     .then(() =>
        //         logic.retrieveEuclideanDistance(userReviews, otherUserReviews)
        //     )
            .then(res.json.bind(res))
            .catch(error => handleResponseError(error, res));
    } catch (error) {
        handleResponseError(error, res);
    }
};
