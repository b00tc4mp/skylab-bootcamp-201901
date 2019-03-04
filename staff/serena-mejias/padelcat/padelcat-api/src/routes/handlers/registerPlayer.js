const logic = require("../logic");
module.exports = (req, res) => {
  const {
    body: { name, surname, email, password }
  } = req;

  try {
    logic
      .registerPlayer(name, surname, email, password)
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
