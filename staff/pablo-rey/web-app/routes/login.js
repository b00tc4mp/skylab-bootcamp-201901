var express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { checkLogin } = require('../middlewares');
var router = express.Router();

router.use(checkLogin('/home'));

router.get('/', (req, res) => res.render('login', { logout: true }));

router.post('/', urlencodedParser, (req, res) => {
  const {
    body: { email, password },
    session,
    session: { logic },
  } = req;

  try {
    logic
      .loginUser(email, password)
      .then(() => {
        session.token = logic.__userToken__;
        res.redirect('/home');
      })
      .catch(({ message }) => res.render('login', { email, message, logout: true }));
  } catch ({ message }) {
    res.render('login', { email, message, logout: true });
  }
});
module.exports = router;
