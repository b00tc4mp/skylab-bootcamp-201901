const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { }, playerId 
  } = req;
  try {
    logic
      .getPlayerById(playerId)
      .then(r => res.json(r))
      .catch(err => {
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};