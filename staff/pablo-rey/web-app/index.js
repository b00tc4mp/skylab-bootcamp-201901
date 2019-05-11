//@ts-check
const express = require('express');
const { injectLogic, checkLogin } = require('./middlewares');
const package = require('./package.json');
const bodyParser = require('body-parser');
const session = require('express-session');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const {
  argv: [, , port = 8080],
} = process;

const app = express();
app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.set('views', 'components');

app.use(
  session({
    secret: 'my super secret phrase to encrypt my session',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static('public'), injectLogic);

app.get('/', checkLogin('/home'), (req, res) => res.render('landing', { logout: true }));

app.get('/register', checkLogin('/home'), (req, res) => res.render('register', { logout: true }));
app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
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

app.get('/login', checkLogin('/home'), (req, res) => res.render('login', { logout: true }));

app.post('/login', [checkLogin('/home'), urlencodedParser], (req, res) => {
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

app.get('/home', checkLogin('/', false), (req, res) => {
  const {
    session: { logic },
  } = req;

  logic
    .retrieveUser()
    .then(({ name }) => res.render('home', { name }))
    .catch(({ message }) => res.render('home', { name, message }));
});

app.get('/home/favorites', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    session: { logic },
  } = req;

  return logic
    .retrieveUser()
    .then(({ name, favs }) =>
      logic.retrieveFavDucks().then(ducks => {
        ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({
          url: `/home/duck/${id}`,
          id,
          title,
          image,
          price,
          isFav: favs.includes(id),
        }));
        res.render('home', { name, query: '', ducks });
      })
    )
    .catch(({ message }) => res.render('home', { message }));
});

app.post('/home/favorites', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    query: { query },
    body,
    session,
    session: { logic },
  } = req;

  session.query = query;

  if (body.toggleFav) {
    const id = body.toggleFav;
    return logic.toggleFavDuck(id).then(() => res.redirect(`/home/favorites`));
  } else res.redirect(req.url);
});

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    query: { query },
    session,
    session: { logic },
  } = req;

  session.query = query;

  return logic
    .retrieveUser()
    .then(({ name, favs }) =>
      logic.searchDucks(query).then(ducks => {
        ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({
          url: `/home/duck/${id}`,
          id,
          title,
          image,
          price,
          isFav: favs.includes(id),
        }));
        res.render('home', { name, query, ducks });
      })
    )
    .catch(({ message }) => res.render('home', { message }));
});

app.post('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    query: { query },
    body,
    session,
    session: { logic },
  } = req;

  session.query = query;

  if (body.toggleFav) {
    const id = body.toggleFav;
    return logic.toggleFavDuck(id).then(() => res.redirect(`/home/search?query=${query}#${id}`));
  } else res.redirect(req.url);
});

app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
  const {
    params: { id },
    session: { query, logic },
  } = req;

  return logic.retrieveUser().then(({ name, favs = [] }) =>
    logic
      .retrieveDuck(id)
      .then(({ title, imageUrl: image, description, price }) => ({
        id,
        title,
        image,
        description,
        price,
        isFav: favs.includes(id),
      }))
      .then(duck => res.render('home', { query, name, duck }))
  );
});

app.post('/home/duck/:id', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    params: { id },
    body,
    session: { logic },
  } = req;
  if (body.toggleFav) {
    return logic.toggleFavDuck(id).then(() => res.redirect(req.url));
  } else res.redirect(req.url);
});

app.get('/cart', checkLogin('/', false), (req, res) => {
  const {
    session: { logic },
  } = req;

  logic
    .retrieveUser()
    .then(({ name }) => logic.retrieveCart().then(cart => res.render('cart', { name, cart })));
});

app.post('/cart', checkLogin('/', false), urlencodedParser, (req, res) => {
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

app.get('/checkout', checkLogin('/', false), (req, res) => {
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

app.post('/checkout', checkLogin('/', false), urlencodedParser, (req, res) => {
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

app.get('/user', checkLogin('/', false), (req, res) => {
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

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.use(function(req, res, next) {
  res.redirect('/');
});

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`));
