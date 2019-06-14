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
            .then(user => {
                const token = createToken(user.id);

                res.json({ token });
            })
            .catch(error => handleResponseError(error, res));
    } catch (error) {
        handleResponseError(error, res);
    }
};
