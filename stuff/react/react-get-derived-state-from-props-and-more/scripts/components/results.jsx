'use strict';

(() => {
    const { Component } = React

    class Results extends Component {
        // state = { results: null }
        state = { results: null, query: null }

        componentDidMount() {
            const { props: { query } } = this

            this.handleSearch(query)
        }

        // componentWillReceiveProps(props) {
        //     const { query } = props

        //     this.handleSearch(query)
        // }

        handleSearch(query) {
            logic.searchDucklings(query, (error, results) => {
                if (error) throw error

                this.setState({ results })
            })
        }

        // ALT to deprecated componentWillReceiveProps

        static getDerivedStateFromProps(props, state) {
            console.log('getDerivedStateFromProps', props, state)

            if (props.query !== state.query)
                return {
                    query: props.query
                }

            return null
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('componentDidUpdate', prevProps, prevState)

            const { props: { query } } = this

            if (query !== prevProps.query)
                this.handleSearch(query)
        }

        render() {
            const { state: { results } } = this

            return <section className="results">
                {results && <ul>
                    {results.map(({ id, title, imageUrl }) => <li key={id}>{title} <img width="100px" src={imageUrl} /></li>)}
                </ul>}
            </section>
        }
    }

    modules.export('results', Results)
})()