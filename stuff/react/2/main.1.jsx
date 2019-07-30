const { Component } = React

class Calculator extends Component {
    constructor() {
        super()

        this.state = { result: null }
    }

    render() {
        return <form onSubmit={event => {
            event.preventDefault()

            const a = event.target.a.value
            const b = event.target.b.value

            const result = Number(a) + Number(b)

            this.setState({ result })
        }}>
            <input type="text" name="a" />
            +
        <input type="text" name="b" />
            <button>=</button>
            <span>{this.state.result}</span>
        </form>
    }
}


function App() {
    return [<Calculator />]
}

ReactDOM.render(<App />, document.getElementById('root'))