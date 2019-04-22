function Title(props) {
    return <h1 onClick={() => alert(`hola ${props.name}!`)}>hola {props.name}</h1>
}

function List(props) {
    const items = props.items.map(name => <li>{name}</li>)

    return <ul>{items}</ul>
}

const names = ['Peter', 'John', 'Erika', 'Maria']

function App() {
    return [<Title name="Pepito" />, <List items={names} />]
}

ReactDOM.render(<App />, document.getElementById('root'))