const jwt = require('jsonwebtoken')

const id = '123'

// let token = jwt.sign({ sub: id }, 'my secret phrase', { expiresIn: '1h' })

// token = token.substring(3) // WHAT if token manipulated?

let token = jwt.sign({ sub: id }, 'my secret phrase', { expiresIn: '1s' }) // WHAT if token expires soon?
const before = Date.now()
while(Date.now() - before < 3000);

const payload = jwt.verify(token, 'my secret phrase')
// const payload = jwt.verify(token, 'my secret phrase 2') // WHAT if the secret phrase changes

debugger

