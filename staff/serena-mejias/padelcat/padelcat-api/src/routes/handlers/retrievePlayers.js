const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: {  },
  } = req;

  try {
    logic
      .retrievePlayers()
      .then(r => res.json(r))
      .catch(err => {
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};