var express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { checkLogin } = require('../middlewares');
var router = express.Router();

router.use(checkLogin('/', false));

router.get('/', (req, res) => {
  const {
    session: { logic },
  } = req;

  logic.retrieveCart().then(cart => {
    let amount = cart.reduce(
      (acc, line) => acc + line.quantity * Number(line.duck.price.split(' ')[0]),
      0
    );
    amount = Math.round(amount * 100) / 100;
    if (cart.length === 0) res.redirect('/');
    else res.render('checkout', { amount });
  });
});

router.post('/', urlencodedParser, (req, res) => {
  const {
    session: { logic },
    body: { amount, address, cardNumber, cardName, expDate, cvv },
  } = req;

  const payment = { amount, date: new Date(), address, cardNumber, cardName, expDate, cvv };
  let cart;

  logic
    .retrieveCart()
    .then(res => (cart = res))
    .then(cart => {
      debugger;
      return logic.pushToHistoricCarts(cart, payment);
    })
    .then(() => logic.saveCart([]))
    .then(() => logic.retrieveUser())
    .then(({ name, surname }) =>
      res.render('./thanks', {
        name,
        surname,
        ...payment,
        cart,
      })
    );
});

module.exports = router;
