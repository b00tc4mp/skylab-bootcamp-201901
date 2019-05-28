var express = require('express');
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { checkLogin } = require('../middlewares');
var router = express.Router();

router.use(checkLogin('/', false));

router.get('/', (req, res) => {
  const {
    session: { logic },
  } = req;
  logic
    .retrieveUser()
    .then(({ name, surname }) =>
      logic
        .retrieveHistoricCarts()
        .then(historicCarts => res.render('user', { name, surname, historicCarts }))
    );
});

module.exports = router;
