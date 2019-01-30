'use strict'

class Home extends React.Component {
    state = { artists: [] }

    handleSearch = query => logic.searchArtists(query, (error, artists) => {
        if (error) console.error(error)
        else this.setState({ artists: artists.map(({id, name: title}) => ({id, title})) })
    })

    handleArtistSelected = id => console.log('artist selected', id)

    render() {
        const { handleSearch, handleArtistSelected, state: { artists } } = this


        return <section className="home">
            <Search onSearch={handleSearch} />
            <Results results={artists} onItemClick={handleArtistSelected} />
        </section>
    }
}