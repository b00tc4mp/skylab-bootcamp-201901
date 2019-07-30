const logic = require("../../logic");
const handleErrors = require("../../middlewares/handle-errors");

module.exports = (req, res) => {
  const {
    userId,
    body: { collectionTitle, newPin },
    params: { id: mapId }
  } = req;

  handleErrors(async () => {
    const newPinId = await logic.createPin(
      userId,
      mapId,
      collectionTitle,
      newPin
    );

    return res.status(201).json({ id: newPinId });
  }, res);
};
