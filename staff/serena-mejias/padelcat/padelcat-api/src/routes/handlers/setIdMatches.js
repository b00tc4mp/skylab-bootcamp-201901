const logic = require("../../logic");
module.exports = (req, res) => {
  const {
     
  } = req;

  try {
    logic
      .setIdMatches()
      .then(res.json.bind(res))
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err);
  }
};