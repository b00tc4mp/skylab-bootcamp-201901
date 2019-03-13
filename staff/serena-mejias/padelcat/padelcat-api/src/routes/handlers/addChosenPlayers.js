const logic = require("../../logic");

module.exports = (req, res) => {
  
  const {
    body: { playersChosen, matchId }
  } = req;
  debugger
  try {
    logic
    .addChosenPlayers(playersChosen, matchId)
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