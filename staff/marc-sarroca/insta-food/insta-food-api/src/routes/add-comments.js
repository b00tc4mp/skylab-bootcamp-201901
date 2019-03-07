const logic = require("../logic");

module.exports = (req, res) => {
  const {
    params: { postId },
    body: { body },
    userId
  } = req;

  try {
    logic
      .addCommentPost(userId, postId, body)
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
