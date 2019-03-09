const logic = require("../logic");

module.exports = (req, res) => {
  const {
    body: { title, description, image },
    userId
  } = req;
  try {
    logic
      .createPost(title, description, image, userId)
      .then(post => res.json({ post }))
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
