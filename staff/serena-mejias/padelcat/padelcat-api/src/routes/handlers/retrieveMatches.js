const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  }
  } = req;

  try {
    logic
      .retrieveMatches()
      .then(res.json.bind(res))
      .catch(error => {
        res.status(400).json({
          error: message
        });
      });
  } catch (err) {
    res.status(400).json({
      error: message
    });
  }
};
