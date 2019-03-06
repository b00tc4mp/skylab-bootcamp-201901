const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  }, playerId
  } = req;

  try {
    logic
      .retrieveMatchesScrapping()
      .then(r =>  res.json(r))
      .catch(error => {
        res.status(400).json({
          error: "123"
        });
      });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
};
