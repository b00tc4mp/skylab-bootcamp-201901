const logic = require("../../logic");
const { createToken } = require("../../token-helper");

module.exports = (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    logic
      .authenticatePlayer(email, password)
      .then(playerId => {
        const token = createToken(playerId);
        res.json({ token });
      })
      .catch(err => {
        res.status(409).json({ err: message });
      });
  } catch (err) {
    res.status(409).json({ err: message });
  }
};
