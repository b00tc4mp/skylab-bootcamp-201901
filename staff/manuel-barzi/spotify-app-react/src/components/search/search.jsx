'use strict'

class Search extends React.Component {
    state = { query: '' }

    handleQueryInput = ({ target: { value: query } }) => this.setState({ query })

    handleSearchSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {
        const { handleQueryInput, handleSearchSubmit, props: { title } } = this

        return <section className="search">
            <h2>{title}</h2>

            <form onSubmit={handleSearchSubmit}>
                <input type="text" placeholder="Search an artist..." onChange={handleQueryInput} />
                <button type="submit">Search</button>
            </form>
        </section>
    }
}