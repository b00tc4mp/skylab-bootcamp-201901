import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import Favorites from '../Favorites'
import './index.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {
    state = { query: null, error: null, ducks: null, duck: null, favs: null }

    componentWillReceiveProps(props) {
        debugger
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else {
            const [, , subpath] = props.location.pathname.split('/')
            if(subpath === 'favorites') this.favorites()
            else subpath && this.retrieve(subpath)
        }
    }

    search = query =>
        Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
            .then(([ducks, favs]) =>
                this.setState({ query, duck: null, ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleSearch = query => this.props.history.push(`/home?query=${query}`)

    retrieve = id =>
        logic.retrieveDuck(id)
            .then(({ title, imageUrl: image, description, price }) =>
                this.setState({ duck: { title, image, description, price } })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleRetrieve = id => this.props.history.push(`/home/${id}`)

    handleFav = id =>
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(favs => this.setState({ favs:favs.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })) }))
    
    favorites = () =>
    logic.retrieveFavDucks()
        .then(favs => this.setState({ ducks:null, duck:null, favs:favs.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price }))}))
        
    handleFavorites = () => this.props.history.push(`/home/favorites`)

    render() {
        const {
            handleSearch,
            handleRetrieve,
            handleFav,
            handleFavorites,
            state: { query, ducks, duck, favs },
            props: { lang, name, onLogout }
        } = this

        const { hello, logout } = literals[lang]

        return <main className="home">
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            <button onClick={handleFavorites}>Favorites</button>
            <Search lang={lang} query={query} onSearch={handleSearch} />
            {!duck && ducks && (ducks.length && <Results items={ducks} onItem={handleRetrieve} onFav={handleFav} favs={favs} /> || <p>No results.</p>)}
            {duck && <Detail item={duck} />}
            {!duck && !ducks && favs && <Favorites favorites={favs} onItem={handleRetrieve} untoggle={handleFav}/>}
        </main>
    }
}

export default withRouter(Home)