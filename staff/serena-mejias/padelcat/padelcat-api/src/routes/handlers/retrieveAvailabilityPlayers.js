const logic = require("../../logic");

module.exports = (req, res) => {
  const {
    body: { id }
  } = req;

  try {
    logic
      .retrieveAvailabilityPlayers(id)
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
