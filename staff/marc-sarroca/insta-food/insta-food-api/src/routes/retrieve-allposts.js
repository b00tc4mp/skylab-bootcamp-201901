const logic = require("../logic");

module.exports = (req, res) => {
  const { userId } = req;

  try {
    logic
      .retrieveAllPosts(userId)
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
