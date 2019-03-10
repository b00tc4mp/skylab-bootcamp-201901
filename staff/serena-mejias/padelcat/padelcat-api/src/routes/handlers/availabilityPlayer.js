const logic = require("../../logic");

module.exports = (req, res) => {
  const {
    body: { id, availabilityArray }
  } = req;
  try {
    logic
      .addAvailabilityPlayer(id, availabilityArray)
      .then(res.json.bind(res))
      .catch(err => {
        throw Error(err);
      });
  } catch (err) {
    throw Error(err);
  }
};
