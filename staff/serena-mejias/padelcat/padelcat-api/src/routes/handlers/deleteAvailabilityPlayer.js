const logic = require("../../logic");

module.exports = (req, res) => {
  debugger;
  const {
    body: { playerId, matchId }
  } = req;
  try {
    logic
      .deleteAvailabilityPlayer(playerId, matchId)
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
