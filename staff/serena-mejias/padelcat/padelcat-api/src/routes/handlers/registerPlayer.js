const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { name, surname, email, password, link, preferedPosition }
  } = req;

  try {
    logic
      .registerPlayer(name, surname, email, password, link, preferedPosition)
      .then(id=> res.json({id}))
      .catch(err => {throw Error(err)});
  } catch (err) {
    throw Error(err);
  }
};
