const express = require('express')
const bodyParser = require('./body-parser')
const render = require('./render')
const template = require('./template')
const render2 = require('./render2')
const logic = require('./logic')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))
app.use(express.static('./'))

let user = {}

const templatePath = './html/index.html'

app.get('/', template(templatePath), render2('./components/landing/index.html', {name: 'Miguel', app: 'Web Hola'}), (req, res) => {
    res.send(res.body)
})

app.get('/register', (req, res) =>
    res.send(render(`<h2>Register</h2>
        <form method="post" action="/register">
            <input type="text" name="name" required placeholder="name" autofocus>
            <input type="text" name="surname" required placeholder="surname">
            <input type="email" name="email" required placeholder="email">
            <input type="password" name="password" required placeholder="password">
            <button>Register</button>
        </form>`))
)

app.post('/register', bodyParser, (req, res) => {
    const { name, surname, email, password } = req.body 

    logic.registerUser(name, surname, email, password)
        .then(() => res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`)))
        .catch(({message}) => {
            `<h2>Register</h2>
            <form method="post" action="/register">
                <input type="text" name="name" required placeholder="name" autofocus>
                <input type="text" name="surname" required placeholder="surname">
                <input type="email" name="email" required placeholder="email">
                <input type="password" name="password" required placeholder="password">
                <button>Register</button>
                <p>${message}</p>
            </form>`
        })    
})

app.get('/login', (req, res) => {
    res.send(render(`<h1>Login</h1>
    <form method="post" action="/login">
            <input type="email" name="email" required placeholder="email" autofocus>
            <input type="password" name="password" required placeholder="password">
            <button>Login</button>
        </form>`))
})

app.post('/login', bodyParser, (req, res) => {
    const { email, password } = req.body
    
    logic.loginUser(email, password)
        .then(() => {
            // res.cookie('name', 'miguel')
            res.redirect('/home')
        })
        .catch(({ message }) => {
            render(`<h1>Login</h1>
            <form method="post" action="/login">
                <input type="email" name="email" required placeholder="email" autofocus>
                <input type="password" name="password" required placeholder="password">
                <button>Login</button>
                <p>${message}</p>
            </form>`) 
        })
})

app.get('/home', template(templatePath), render2('./components/home/index.html', { username: user.username }), (req, res) => {
        logic.registerUser() //acabar esto!
        res.send(res.body)
    }
)

app.listen(port)