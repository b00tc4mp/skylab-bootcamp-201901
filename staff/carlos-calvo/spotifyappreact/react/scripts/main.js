const root = document.getElementById('root')

const title = React.createElement('h1', null, 'hello world')

const emailInput = React.createElement('input', null)
const passwordInput = React.createElement('input', null)
const loginButton = React.createElement('button', null, 'Login')
const form = React.createElement('form', null, emailInput, passwordInput, loginButton)
const loginPanel = React.createElement('section', null, form)

const item1 = React.createElement('li', null, 'Tachi')
const item2 = React.createElement('li', null, 'Nico')
const item3 = React.createElement('li', null, 'Robert')
const item4 = React.createElement('li', null, 'Victor')

const list = React.createElement('ul', null, item1, item2, item3, item4)

ReactDOM.render([title, loginPanel, list], root)