const express = require('express')
const bodyParser = require('./body-parser')
const literals = require('./i18n')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

let user = {}
let error = '';
let selectedLanguage = 'en';

function render(body) {
    return ( 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body class="container">
        ${body}
    </body>
    </html>`)
}

app.get('/', (req, res) => {
  res.send(render(
    `<section class="landing">
        <img
          class="landing__image"
          src="https://media.tenor.com/images/4f8eca353a4e30bb521b06e19da01e04/tenor.gif"
        />
        <div class="landing__actions">
          <a class="btn landing__login" href="/login">
            ${literals.landing[selectedLanguage].login}
          </a>
          <span class="landing__middleText">
            ${literals.landing[selectedLanguage].or}
          </span>
          <a
            class="btn btn--small landing__register"
            href="/register"
          >
            ${literals.landing[selectedLanguage].register}
          </a>
        </div>
      </section>
    `
  ))
})

app.get('/register', (req, res) =>
    res.send(render(
      `<form class="register">
      <h2 class="register__title">
        ${literals[selectedLanguage].title}
      </h2>

      ${!!errorMessage && <Feedback cssClass="register" errorMessage={errorMessage} />}

      <ul class="register__inputs">
        <li>
          <input
            class="register__input input"
            type="text"
            name="name"
            placeholder="${literals.register[selectedLanguage].name}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="text"
            name="surname"
            placeholder="${literals.register[selectedLanguage].surname}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="text"
            name="email"
            placeholder="${literals.register[selectedLanguage].email}"
          />
        </li>
        <li>
          <input
            class="register__input input"
            type="password"
            name="password"
            placeholder="${literals.register[selectedLanguage].password}"
          />
        </li>
      </ul>

      <button class="btn register__button">
        ${literals.register[selectedLanguage].title}
      </button>
    </form>`))
)

app.post('/register', bodyParser, (req, res) => {

    const { username, password } = req.body

    user.username = username
    user.password = password

    res.send(render(`    
      <section className="registerSuccessful">
         User successfully registered, you can proceed to{" "}
          <a href="/login">Login</a>
          .
        </section>
    `))
})

app.get('/login', (req, res) =>
    res.send(render(
      `<div class="login">
        <h2 class="login__title">Login</h2>
        <form class="login__form" method="post" action="/login">
            <input class="input" type="text" name="username" placeholder="Username">
            <input class="input" type="password" name="password" placeholder="Password">
            ${error ? `<p class="error">${error}</p>`: ''}
            <button class="btn">Login</button>
        </form>
       </div>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) res.redirect('/home')
    else {
      error = 'Wrong credentials';
      res.redirect('/login');
    }
})

app.get('/home', (req, res) => res.send(render(`<h1>Hola, ${user.username}!`)));

app.listen(port)