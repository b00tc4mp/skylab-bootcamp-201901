var express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { checkLogin } = require('../middlewares');
var router = express.Router();

router.use(checkLogin('/home'));

router.get('/', (req, res) => res.render('register', { logout: true }));
router.post('/', urlencodedParser, (req, res) => {
  const {
    body: { name, surname, email, password },
    session: { logic },
  } = req;

  try {
    logic
      .registerUser(name, surname, email, password)
      .then(() =>
        res.render('login', { email, message: 'Register successful. Please login', logout: true })
      )
      .catch(({ message }) => {
        res.render('register', { name, surname, email, message });
      });
  } catch ({ message }) {
    res.render('register', { name, surname, email, message });
  }
});

module.exports = router;
