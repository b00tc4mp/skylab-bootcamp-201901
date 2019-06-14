const logic = require("../logic");

module.exports = (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    logic
      .authenticateUser(email, password)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(401).json({
      error: message
    });
  }
};
