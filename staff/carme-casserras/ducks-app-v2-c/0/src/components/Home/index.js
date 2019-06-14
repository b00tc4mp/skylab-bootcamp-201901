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
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else {
            const [, , id] = props.location.pathname.split('/')

            id && this.retrieve(id)
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
            .then(favs => this.setState({ favs: favs.map(({id, title, imageUrl : image, price}) => ({id, title, image, price})) }))

    handleCard = id =>

        logic.duckToCard(id)
            .then(() => logic.retrieveUser()) 
            
    handleListFavs = () => {

        return logic.retrieveFavDucks() 
        
            .then(favs => this.setState({ducks: null, duck: null, favs: favs.map(({id, title, imageUrl : image, price}) => ({id, title, image, price})) })) 
            
            .then (()=> this.props.history.push(`/home/favs`))
        
    }
    render() {
        const {
            handleSearch,
            handleRetrieve,
            handleFav,
            handleListFavs,
            state: { query, ducks, duck, favs },
            props: { lang, name, onLogout}
        } = this

        const { hello, logout } = literals[lang]

        return <main className="home">
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            <button onClick={handleListFavs}>Favorites</button>            
            <Search lang={lang} query={query} onSearch={handleSearch} />
            {!duck && ducks && (ducks.length && <Results items={ducks} onItem={handleRetrieve} onFav={handleFav} favs={favs} /> || <p>No results.</p>)}
            {duck && <Detail item={duck} />}
            {!ducks && !duck && (favs && <Favorites onItem={handleRetrieve} unToggle={handleFav} items={favs}  />|| <p>No results.</p>)}

        </main>
    }
}

export default withRouter(Home)