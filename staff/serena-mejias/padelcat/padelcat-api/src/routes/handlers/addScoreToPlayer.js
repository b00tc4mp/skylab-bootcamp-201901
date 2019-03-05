const logic = require("../../logic");
module.exports = (req, res) => {
  debugger
  const {
    playerId, body: { score }
  } = req;

  try {
    logic
      .addScoreToPlayer(playerId, score)
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
