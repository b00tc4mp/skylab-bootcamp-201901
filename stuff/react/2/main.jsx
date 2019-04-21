const { Component } = React

class Calculator extends Component {
    state = { result: null }

    handleSubmit = event => {
        event.preventDefault()

        const a = event.target.a.value
        const b = event.target.b.value

        const result = logic.add(Number(a), Number(b))

        this.setState({ result })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
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