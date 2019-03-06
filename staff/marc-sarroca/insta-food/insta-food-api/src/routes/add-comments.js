const logic = require("../logic");

module.exports = (req, res) => {
  const {
    params: { postId },
    body: { text },
    userId
  } = req;

  try {
    logic
      .addCommentPost(userId, postId, text)
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
