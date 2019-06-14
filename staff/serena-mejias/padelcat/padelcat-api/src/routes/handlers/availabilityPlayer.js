const logic = require("../../logic");

module.exports = (req, res) => {
  const {
    body: { playerId, matchId }
  } = req;
  debugger
  try {
    logic
    .addAvailabilityPlayer(playerId, matchId)
      .then(response => {
        res.json(response);
      })
      .catch(err => {
        res.status(409).json({ err: err.message });
      });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
