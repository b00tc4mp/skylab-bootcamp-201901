const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { link }
  } = req;

  try {
    logic
      .setScorePlayers(link)
      .then(res.json.bind(res))
      .catch(err => {
        res.status(409).json({ err: err.message });
      });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
