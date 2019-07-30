import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Nav from '../Nav'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import Favs from '../Favs'
import Cart from '../Cart'
import User from '../User'
import './index.sass'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {
    state = { query: null, error: null, ducks: null, duck: null, favs: null, listfavs: null, cart: null, user: null, name: null }

    componentDidMount() {
        logic.retrieveUser()
            .then(user =>
                this.setState({ name: user.name })
            )
    }

    componentWillReceiveProps(props) {
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else {
            const [, , id] = props.location.pathname.split('/')
            if(id !== 'favs' && id !== 'cart') 
                id && this.retrieve(id)
        }
    }

    search = query =>
        Promise.all([logic.searchDucks(query), logic.retrieveFavDucks()])
            .then(([ducks, favs]) =>
                this.setState({ query, user: null, cart: null, listfavs: null ,duck: null, ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs })
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
            .then(favs => this.setState({ favs }))

    handleLogout = () => {
        logic.logoutUser()
        this.props.history.push('/')
    }

    toggleListFav = id =>
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(ducks =>
                this.setState({ user: null, duck: null, ducks: null, listfavs: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price }))}, () => this.props.history.push('/home/favs'))
        )

    handleListFavs = () => {
        logic.retrieveFavDucks()
            .then(ducks =>
                this.setState({ user: null, duck: null, ducks: null, cart: null, listfavs: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price }))}, () => this.props.history.push('/home/favs'))
            )
    }

    handleCart = id => {
        logic.addToCart(id)
    }

    handleListCart = () => {
        logic.retrieveCartItems()
            .then(items =>
                this.setState({ user: null, duck: null, ducks: null, listfavs: null,  cart: items.map(({ id, title, imageUrl: image, price, qty }) => ({ id, title, image, price, qty }))}, () => this.props.history.push('/home/cart'))
            )
    }

    handleUpdate = (name, surname, email) => {
        logic.updateUser({name, surname, email})
            .then(() => logic.retrieveUser())
            .then(({name, surname, email }) => {
                this.setState({ name: name, user: {name, surname, email}})
            })
    }

    handleDelete = (email, password) => {
        try {
            logic.deleteUser(email, password)
            .then(() => {
                logic.logoutUser()
                this.props.history.push('/')
            })
            .catch(error => {
                debugger
                this.setState({ error: error.message })
            })
        } catch (error) {
            debugger
            this.setState({ error: error.message })
        }
    }

    handleUserMenu = () => {
        logic.retrieveUser()
            .then(({name, surname, email }) => {
                this.setState({ user: {name, surname, email}, listfavs: null, cart: null, duck: null, ducks: null,}, () => this.props.history.push('/home/user'))
            })
    }

    handleHome = () => {
        this.setState({error: null, ducks: null, duck: null, favs: null, listfavs: null, cart: null, user: null}, () => this.props.history.push('/home'))
    }

    render() {
        const {
            handleSearch,
            handleRetrieve,
            handleFav,
            handleLogout,
            toggleListFav,
            handleListFavs,
            handleCart,
            handleListCart,
            handleDelete,
            handleUpdate,
            handleUserMenu,
            handleHome,
            state: { query, ducks, duck, favs, listfavs, cart, user, name, error },
            props: { lang }
        } = this

        const { hello } = literals[lang]

        return <main className="home">
            <h1>{hello}, {name}!</h1>
            <Nav lang={lang} onLogout={handleLogout} onFavs={handleListFavs} onCart={handleListCart} onUser={handleUserMenu} onHome={handleHome}/>
            {!user && <Search lang={lang} query={query} onSearch={handleSearch} />}
            {!duck && ducks && (ducks.length && <Results items={ducks} onItem={handleRetrieve} onFav={handleFav} favs={favs} onCart={handleCart}/> || <p>No results.</p>)}
            {duck && <Detail item={duck} />}
            {!duck && listfavs && <Favs items={listfavs} onItem={handleRetrieve} onFav={toggleListFav}/>}
            {!duck && cart && <Cart items={cart} onItem={handleRetrieve}/>}
            {!duck && user &&<User onUpdate={handleUpdate} onDelete={handleDelete} user={user} error={error}/>}
        </main>
    }
}

export default withRouter(Home)