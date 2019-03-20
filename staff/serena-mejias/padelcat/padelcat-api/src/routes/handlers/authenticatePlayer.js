const logic = require("../../logic");
const { createToken } = require("../../token-helper");

module.exports = (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    debugger
    logic
      .authenticatePlayer(email, password)
      .then(response => {
        res.json({ player: response, token: createToken(response._id) });
      })
      .catch(err => {
        res.status(409).json({ err: err.message });
      });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
