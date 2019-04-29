const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  }, playerId
  } = req;

  try {
    logic
      .retrieveScoreScrapping(playerId)
      .then(r => res.json(r))
      .catch(err => {
        res.status(400).json({ err: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
