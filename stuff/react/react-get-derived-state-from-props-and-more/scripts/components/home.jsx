'use strict';

(() => {
    const { withRouter, Route } = ReactRouterDOM
    // const { Route } = ReactRouterDOM // HINT withRouter not necessary when this component is rendered in its parent by means of Route, which already injects 'history' in props.
    const Search = modules.import('search')
    const Results = modules.import('results')

    function Home(props) {
        function handleSearch(query) {
            props.history.push(`/home/search/${query}`)
        }

        return <section className="home">
            <Search onSearch={handleSearch} /> <button onClick={props.onLogout}>Logout</button>
            <Route path="/home/search/:query" render={({ match: { params: { query } } }) => <Results query={query} />} />
        </section>
    }

    // modules.export('home', withRouter(Home))
    modules.export('home', withRouter(Home))
})()