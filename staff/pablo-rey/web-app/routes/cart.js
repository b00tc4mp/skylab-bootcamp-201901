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

  logic
    .retrieveUser()
    .then(({ name }) => logic.retrieveCart().then(cart => res.render('cart', { name, cart })));
});

router.post('/', urlencodedParser, (req, res) => {
  function saveAndRender(cart) {
    logic
      .saveCart(cart)
      .then(() => logic.retrieveUser())
      .then(({ name }) => res.render('cart', { name, cart }));
  }

  const {
    body: { addToCart, reduceFromCart, removeFromCart },
    session: { logic },
  } = req;

  logic.retrieveCart().then(cart => {
    if (addToCart) {
      const id = addToCart;
      logic.retrieveDuck(id).then(duck => {
        duck = { ...duck, image: duck.imageUrl };
        const index = cart.findIndex(line => line.duck.id === duck.id);
        if (index !== -1) {
          cart[index] = { duck, quantity: cart[index].quantity + 1 };
        } else {
          cart.push({ duck, quantity: 1 });
        }
        saveAndRender(cart);
      });
    } else if (reduceFromCart) {
      const id = reduceFromCart;
      const index = cart.findIndex(line => line.duck.id === id);
      cart[index].quantity--;
      if (!cart[index].quantity) cart.splice(index, 1);
      saveAndRender(cart);
    } else if (removeFromCart) {
      const id = removeFromCart;
      const index = cart.findIndex(line => line.duck.id === id);
      cart.splice(index, 1);
      saveAndRender(cart);
    } else res.redirect('/cart');
  });
});

module.exports = router;
