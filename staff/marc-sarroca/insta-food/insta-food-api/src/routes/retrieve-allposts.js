const logic = require("../logic");

module.exports = (req, res) => {
  const {
    params: { page }
  } = req;

  try {
    logic
      .retrieveAllPosts(page)
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
