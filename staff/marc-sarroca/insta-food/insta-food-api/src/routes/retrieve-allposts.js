const logic = require("../logic");

module.exports = (req, res) => {
  try {
    logic
      .retrieveAllPosts()
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(400).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(400).json({
      error: message
    });
  }
};
