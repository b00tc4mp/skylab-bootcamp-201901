const logic = require("../../logic");

module.exports = (req, res) => {

  const {
    body: { playersChosen, matchId }
  } = req;

  try {
    logic
    .addChosenPlayers(playersChosen, matchId)
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