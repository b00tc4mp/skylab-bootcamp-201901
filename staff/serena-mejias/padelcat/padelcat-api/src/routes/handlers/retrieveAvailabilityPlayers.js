const logic = require("../../logic");

module.exports = (req, res) => {
  const { matchId } = req.params;

  try {
    debugger
    logic
      .retrieveAvailabilityPlayers(matchId)
      .then(response => res.json(response))
      .catch(err => {
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};
