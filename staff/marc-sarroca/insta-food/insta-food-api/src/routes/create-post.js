const logic = require("../logic");

module.exports = (req, res) => {
  const {
    body: { tags, title, description, image, comments },
    userId
  } = req;
  try {
    logic
      .createPost(tags, title, description, image, comments, userId)
      .then(id => res.json({ id }))
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
