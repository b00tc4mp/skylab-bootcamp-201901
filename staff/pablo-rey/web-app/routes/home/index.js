var express = require('express');
const { checkLogin } = require('../../middlewares');
var router = express.Router();

router.use(checkLogin('/', false));

router.use('/favorites', require('./favorites'));
router.use('/search', require('./search'));
router.use('/duck', require('./duck'));

router.get('/', (req, res) => {
  const {
    session: { logic },
  } = req;

  logic
    .retrieveUser()
    .then(({ name }) => res.render('home', { name }))
    .catch(({ message }) => res.render('home', { name, message }));
});

module.exports = router;
