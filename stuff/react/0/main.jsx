const title = <h1>hola mundo</h1>

const names = ['Peter', 'John', 'Erika', 'Maria']

const items = names.map(name => <li>{name}</li>)

const list = <ul>{items}</ul>

ReactDOM.render([title, list], document.getElementById('root'))