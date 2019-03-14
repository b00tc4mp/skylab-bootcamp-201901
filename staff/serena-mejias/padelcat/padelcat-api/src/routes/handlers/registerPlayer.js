const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { admin, name, surname, email, password, link, preferedPosition }
  } = req;
  try {
    debugger
    logic
      .registerPlayer(admin, name, surname, email, password, link, preferedPosition)
      .then(id=> res.json({id}))
      .catch(err => {throw Error(err)});
  } catch (err) {
    throw Error(err);
  }
};
