const logic = require("../../logic");
module.exports = (req, res) => {
  const {} = req;
  try {
    logic
      .getMatchesWithData()
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
