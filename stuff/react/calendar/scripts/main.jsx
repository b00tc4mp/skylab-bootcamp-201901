function App(props) {
    return <section>
        <h1>Calendar</h1>
        <Calendar year={2019} month={5} />
    </section>
}

ReactDOM.render(<App />, document.getElementById('root'))