const logic = require("../../logic");
module.exports = (req, res) => {
  const {
    body: { link }
  } = req;

  try {
    logic
      .setScorePlayers(link)
      .then(res.json.bind(res))
      .catch(err => {
        throw Error (err)
    });
  } catch (err) {
    throw Error(err)
  }
};
