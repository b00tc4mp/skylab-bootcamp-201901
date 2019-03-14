const logic = require("../../logic");

module.exports = (req, res) => {
  const {
    body: { playerId, matchId }
  } = req;
  try {
    logic
      .addAvailabilityPlayer(playerId, matchId)
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
