function Title() {
    return <h1>hola mundo</h1>
}

function List() {
    const names = ['Peter', 'John', 'Erika', 'Maria']
    
    const items = names.map(name => <li>{name}</li>)
    
    return <ul>{items}</ul>
}

function App() {
    return [<Title />, <List />]
}

ReactDOM.render(<App />, document.getElementById('root'))