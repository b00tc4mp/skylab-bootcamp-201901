import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'

class Home extends Component {
    state = { error: null, ducks: [], duck: null, favs: [] }

    handleSearch = query =>
        Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
            .then(([ducks, favs]) =>
                this.setState({ duck: null, ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs })
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleRetrieve = id => logic.retrieveDuck(id)
                .then(({ id, title, imageUrl: image, description, price}) => this.setState({duck: { id, title, image, description, price }}))
                .catch(error => this.setState({ error: error.message}))

    handleFav = id =>
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(favs => this.setState({ favs }))

    render() {
        const {
            handleSearch,
            handleRetrieve,
            handleFav,
            state: { ducks, duck, favs },
            props: { lang, name, onLogout }
        } = this

        const { hello, logout } = literals[lang]
        
        return <main>
            <h1>{hello}, {name}!</h1>
            <button onClick={onLogout}>{logout}</button>
            <Search lang={lang} onSearch={handleSearch} />
            {!duck && <Results items={ducks} onItem={handleRetrieve} onFav={handleFav} favs={favs} />}
            {duck && <Detail item={duck} onFav={handleFav} favs={favs} />}
        </main>
    }
}

export default Home