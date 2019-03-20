const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  }
  } = req;
  try {
    logic
      .retrieveMatchesScrapping()
      .then(response =>  res.json(response))
      .catch(err => {
        res.status(400).json({ err: err.message });
      });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
