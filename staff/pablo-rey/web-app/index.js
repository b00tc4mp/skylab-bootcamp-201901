//@ts-check
const express = require('express');
const bodyParser = require('./body-parser');
const literals = require('./i18n');
const render = require('./render');

const {
  argv: [, , port],
} = process;

const app = express();

app.use(express.static('public'));

let user = {};
let error = '';

app.get('/', (req, res) => {
  res.send(
    render(
      `<section class="landing">
        <img
          class="landing__image"
          src="https://media.tenor.com/images/4f8eca353a4e30bb521b06e19da01e04/tenor.gif"
        />
        <div class="landing__actions">
          <a class="btn landing__login" href="/login">
            ${literals.landing.login}
          </a>
          <span class="landing__middleText">
            ${literals.landing.or}
          </span>
          <a
            class="btn btn--small landing__register"
            href="/register"
          >
            ${literals.landing.register}
          </a>
        </div>
      </section>
    `,
      'landing'
    )
  );
});

app.get('/changeLanguage/:goto', (req, res) => {
  const {
    query: { language },
    params: { goto },
  } = req;
  literals.language = language;
  if (goto === 'landing') res.redirect('/');
  else res.redirect('/' + req.params.goto);
});

function feedback(cssClass, errorMessage) {
  return `
    <div class=${cssClass + '__error'}>
      <p class=${cssClass + '__error-message'}>${errorMessage}</p>
    </div>`;
}

app.get('/register', (req, res) =>
  res.send(
    render(
      `<form class="register">
      <h2 class="register__title">
        ${literals.title}
      </h2>

      ${!!errorMessage && feedback('register', errorMessage)} 

      <ul class="register__inputs">
        <li>
          <input
            class="register__input input"
            type="text"
            name="name"
            placeholder="${literals.register.name}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="text"
            name="surname"
            placeholder="${literals.register.surname}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="text"
            name="email"
            placeholder="${literals.register.email}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="password"
            name="password"
            placeholder="${literals.register.password}"
          />
        </li>
      </ul>

      <button class="btn register__button">
        ${literals.register.title}
      </button>
    </form>`,
      'register'
    )
  )
);

app.post('/register', bodyParser, (req, res) => {
  const { username, password } = req.body;

  user.username = username;
  user.password = password;

  res.send(
    render(`    
      <section className="registerSuccessful">
         User successfully registered, you can proceed to{" "}
          <a href="/login">Login</a>
          .
        </section>
    `)
  );
});

app.get('/login', (req, res) =>
  res.send(
    render(
      `<div class="login">
        <h2 class="login__title">Login</h2>
        <form class="login__form" method="post" action="/login">
            <input class="input" type="text" name="username" placeholder="Username">
            <input class="input" type="password" name="password" placeholder="Password">
            ${error ? `<p class="error">${error}</p>` : ''}
            <button class="btn">Login</button>
        </form>
       </div>`
    , 'login')
  )
);

app.post('/login', bodyParser, (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) res.redirect('/home');
  else {
    error = 'Wrong credentials';
    res.redirect('/login');
  }
});

app.get('/home', (req, res) => res.send(render(`<h1>Hola, ${user.username}!`)));

app.listen(port || 7000);
