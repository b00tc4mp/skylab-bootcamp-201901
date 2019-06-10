const logic = require("../../logic");
const handleErrors = require("../../middlewares/handle-errors");

module.exports = (req, res) => {
  handleErrors(async () => {
    const {
      userId,
      params: { id: mapId, title: collectionTitle },
      body: { newTitle }
    } = req;

    const user = await logic.updateCollection(
      userId,
      mapId,
      collectionTitle,
      newTitle
    );

    return res.json(user);
  }, res);
};
