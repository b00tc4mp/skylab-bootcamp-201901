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

app.use('/home', require('./routes/home'));
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'));
app.use('/cart', require('./routes/cart'));
app.use('/checkout', require('./routes/checkout'));
app.use('/user', require('./routes/user'));

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.use(function(req, res, next) {
  res.redirect('/');
});

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`));
