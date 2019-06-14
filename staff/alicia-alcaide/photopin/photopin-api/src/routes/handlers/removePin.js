const logic = require("../../logic");
const handleErrors = require("../../middlewares/handle-errors");

module.exports = (req, res) => {
  handleErrors(async () => {
    const {
      userId,
      params: { id: pinId }
    } = req;

    await logic.removePin(userId, pinId);
    return res.status(201).json({ message: "Ok, pin deleted" });
  }, res);
};
