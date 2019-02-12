'use strict';

(() => {
    const { Component } = React

    class Search extends Component {
        state = { query: null }

        handleQueryInput = event => this.setState({ query: event.target.value })

        handleSubmit = event => {
            event.preventDefault()

            const { state: { query }, props: { onSearch } } = this

            onSearch(query)
        }

        render() {
            const { handleQueryInput, handleSubmit } = this

            return <section className="search">
                <form onSubmit={handleSubmit}>
                    <input type="text" onChange={handleQueryInput} />
                    <button type="submit">Search</button>
                </form>
            </section>
        }
    }

    modules.export('search', Search)
})()