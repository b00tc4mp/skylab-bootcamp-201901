const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  playerId, score }
  } = req;

  try {
    logic
      .retrieveScoreData(playerId, score)
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
