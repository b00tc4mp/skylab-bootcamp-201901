const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { name, surname, email, password, link, preferedPosition, admin }
  } = req;
  try {
    logic
      .registerPlayer(name, surname, email, password, link, preferedPosition,admin)
      .then(id=> res.json({id}))
      .catch(err => {
        throw Error(err)});
  } catch (err) {
    throw Error(err);
  }
};
