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
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};
