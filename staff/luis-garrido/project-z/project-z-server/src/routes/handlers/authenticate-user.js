const logic = require("../../logic");

const { createToken } = require("../../token-helper");
const { handleResponseError } = require("../route-helper");

module.exports = (req, res) => {
    const {
        body: { username, email, password }
    } = req;

    const loggingData = email ? email : username;

    try {
        logic
            .authenticateUser(loggingData, password)
            // .then(data => res.json(data))
            .then(userId => {
                const token = createToken(userId);

                res.json({ token });
            })
            .catch(error => handleResponseError(error, res));
    } catch (error) {
        handleResponseError(error, res);
    }
};
