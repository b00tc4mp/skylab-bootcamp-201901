const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  },
  } = req;

  try {
    logic
      .retrievePlayers()
      .then(r => res.json(r))
      .catch(err => {
        res.status(409).json({ err: err.message });
      });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};