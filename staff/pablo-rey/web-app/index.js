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
    logic,
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
    logic,
    session,
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
  const { logic } = req;

  logic
    .retrieveUser()
    .then(({ name }) => res.render('home', { name }))
    .catch(({ message }) => res.render('home', { name, message }));
});

app.get('/home/favorites', checkLogin('/', false), urlencodedParser, (req, res) => {
  const { logic, session } = req;

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
    logic,
    session,
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
    logic,
    session,
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
    logic,
    session,
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
    logic,
    session: { query },
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
    logic,
    session: { query },
  } = req;
  if (body.toggleFav) {
    return logic.toggleFavDuck(id).then(() => res.redirect(req.url));
  } else res.redirect(req.url);
});

app.get('/cart', checkLogin('/', false), (req, res) => {
  const {
    params: { id },
    logic,
    session,
  } = req;

  const cart = session.cart || [];
  return logic.retrieveUser().then(({ name }) => res.render('cart', { name, cart }));
});

app.post('/cart', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    body: { addToCart, reduceFromCart, removeFromCart },
    logic,
    session,
  } = req;

  const cart = session.cart || (session.cart = []);

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
      res.redirect('/cart');
    });
  } else if (reduceFromCart) {
    const id = reduceFromCart;
    const index = cart.findIndex(line => line.duck.id === id);
    cart[index].quantity--;
    if (!cart[index].quantity) cart.splice(index, 1);
    res.redirect('/cart');
  } else if (removeFromCart) {
    const id = removeFromCart;
    const index = cart.findIndex(line => line.duck.id === id);
    cart.splice(index, 1);
    res.redirect('/cart');
  } else res.redirect('/cart');
});

app.get('/checkout', checkLogin('/', false), (req, res) => {
  const {
    params: { id },
    logic,
    session,
  } = req;

  const cart = session.cart || [];
  const amount = cart.reduce((acc, line) => acc + line.quantity * Number(line.duck.price.split(' ')[0]), 0)
  if (cart.length === 0) res.redirect('/')
  else res.render('checkout', { amount });
});

app.post('/checkout', checkLogin('/', false), urlencodedParser, (req, res) => {
  const {
    logic,
    session,
    body: {amount, address, cardNumber,cardName, cvv}
  } = req;
  //TODO: checkdata and process

  const cart = session.cart;
  session.cart = [];
  logic.retrieveUser()
    .then(({name, surname}) => 
      res.render('./checkout/thanks', { name, surname, address, cardNumber, cardName, amount ,cart}));
});

app.post('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

app.use(function(req, res, next) {
  res.redirect('/');
});

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`));
