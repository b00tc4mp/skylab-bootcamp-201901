const logic = require('../../logic');
const { handleResponseError } = require('../../utils/response-error');

module.exports = (req, res) => {
  const {
    body: { name, surname, email, password },
  } = req;

  try {
    logic
      .registerUser(name, surname, email, password)
      .then(id => res.json({ id }))
      .catch(error => handleResponseError(error, res));
  } catch (error) {
    handleResponseError(error, res);
  }
};
