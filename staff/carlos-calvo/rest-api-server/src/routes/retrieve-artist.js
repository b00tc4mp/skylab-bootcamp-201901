const logic = require("../logic");

module.exports = (req, res) => {
  const {
    params: { artistId }
  } = req;

  try {
    logic
      .retrieveAlbums(artistId)
      .then(res.json.bind(res))
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  } catch ({ message }) {
    res.status(401).json({
      error: message
    });
  }
};