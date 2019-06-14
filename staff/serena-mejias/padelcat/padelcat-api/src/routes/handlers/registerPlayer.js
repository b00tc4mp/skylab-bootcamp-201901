const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { name, surname, email, password, link, preferedPosition, admin }
  } = req;
  try {
    logic
      .registerPlayer(name, surname, email, password, link, preferedPosition,admin)
      .then(response=> res.json(response))
      .catch(err => {
        res.status(409).json({ err: err.message });
      });
  } catch (err) {
    res.status(409).json({ err: err.message });
  }
};
