const Logic = require('../logic');

function injectLogic(req, res, next) {
  const {
    session: { token },
  } = req;

  req.session.logic = new Logic(token);
  next();
}

module.exports = injectLogic;
