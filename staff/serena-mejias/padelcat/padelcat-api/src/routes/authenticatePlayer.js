const logic = require("../logic");
module.exports = (req, res) => {
  const {
    body: { email, password }
  } = req;

  try {
    logic
      .authenticatePlayer(email, password)
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
