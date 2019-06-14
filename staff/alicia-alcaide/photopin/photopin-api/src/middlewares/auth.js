const handleErrors = require("./handle-errors");
const { UnauthorizedError } = require("photopin-errors");
const jwt = require("jsonwebtoken");

const {
  env: { JWT_SECRET }
} = process;

module.exports = (req, res, next) => {
  handleErrors(() => {
    return Promise.resolve().then(() => {
      const {
        headers: { authorization }
      } = req;

      if (!authorization) throw new UnauthorizedError();

      const token = authorization.slice(7);

      try {
        const { sub } = jwt.verify(token, JWT_SECRET);
        req.userId = sub;
        next();
      } catch (error) {
        throw new UnauthorizedError();
      }
    });
  }, res);
};
