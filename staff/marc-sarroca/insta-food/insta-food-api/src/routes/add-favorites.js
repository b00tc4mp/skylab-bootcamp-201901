const logic = require("../logic");

module.exports = (req, res) => {
  const {
    userId,
    params: { postId }
  } = req;

  try {
    logic
      .toggleFavoritesUser(userId, postId)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(409).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(409).json({
      error: message
    });
  }
};
