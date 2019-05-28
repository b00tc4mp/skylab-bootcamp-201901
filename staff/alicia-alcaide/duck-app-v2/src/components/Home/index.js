import React, { Component } from 'react'
import './index.sass'
import literals from './literals'
import logic from '../../logic'
import Search from '../Search'
import Results from '../Results'
import Detail from '../Detail'
import ShoppingCart from '../ShoppingCart'
import CheckoutCart from '../CheckoutCart'
import CheckoutCartInfo from '../CheckoutCartInfo'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {
    state = { query: null, error: null, ducks: null, duck: null, favs: null, cart: null, 
              shoppingCart: null, checkoutCart: null, cartInfo: null }

    componentWillReceiveProps(props) {
        debugger
        if (props.location.search) {
            const { query } = queryString.parse(props.location.search)

            query && this.search(query)
        } else if (props.location.pathname === '/home/favorites')  {
            this.retrieveFavorites()
        } else if (props.location.pathname === '/home/cart')  {
            this.retrieveShoppingCart()
        } else    
            {
                const [, , id] = props.location.pathname.split('/')

                id && this.retrieve(id)
            }
    }

    search = query =>
        Promise.all([logic.searchDucks(query), logic.retrieveFavDucks(), logic.retrieveCartDucks()])
            .then(([ducks, favs, cart]) =>
                this.setState({ query, shoppingCart: null, checkoutCart: null,  duck: null, cartInfo: null, 
                                ducks: ducks.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })), favs, cart })
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

    handleToggleFav = id =>
        logic.toggleFavDuck(id)
            .then(() => logic.retrieveFavDucks())
            .then(favs => this.setState({ favs, ducksFavs : favs.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })) }))


    handleToggleCart = id =>
        logic.toggleCartDuck(id)
            .then(() => logic.retrieveCartDucks())
            .then(cart => this.setState({ cart, shoppingCart: cart.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })) }))


    handleShowFavorites = () => this.props.history.push('/home/favorites')

    retrieveFavorites = () =>
        logic.retrieveFavDucks()
            .then((ducksFavs) =>
                this.setState({ cart: null, shoppingCart: null, duck: null, ducks: null, checkoutCart: null, cartInfo: null,
                                ducksFavs: ducksFavs.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price }))})
            )
            .catch(error =>
                this.setState({ error: error.message })
            )


    handleShowCart = () => this.props.history.push('/home/cart')

    retrieveShoppingCart = () =>
        logic.retrieveCartDucks()
            .then((shoppingCart) => {
                this.setState({ cart: null, duck: null, ducks: null, ducksFavs: null, checkoutCart: null, cartInfo: null, 
                                shoppingCart: shoppingCart.map(({ id, title, imageUrl: image, price }) => ({ id, title, image, price })) })
                }
            )
            .catch(error =>
                this.setState({ error: error.message })
            )

    handleCheckout = (totalPrice) => {
        this.setState({checkoutCart : totalPrice, duck: null, ducks: null, ducksFavs: null, cartInfo: null})
    }

    handlePayCart = () => {

        // TODO - charge on credit card

        logic.cartDucksToOrder()
            .then(() => {
                this.setState({cartInfo: 'ordered', checkoutCart: null, shoppingCart: null, duck: null, ducks: null, ducksFavs: null})
                }
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    handleDeleteCart = () => {
        logic.deleteCartDucks()
            .then(() => {
                this.setState({cartInfo: 'deleted', checkoutCart: null, shoppingCart: null, duck: null, ducks: null, ducksFavs: null})
                }
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    handleCartInfo = () => {
        this.setState({cartInfo: null, checkoutCart: null, shoppingCart: null, duck: null, ducks: null, ducksFavs: null})
    }


    render() {
        const {
            handleSearch,
            handleShowFavorites,
            handleRetrieve,
            handleToggleFav,
            handleToggleCart,
            handleShowCart,
            handleCheckout,
            handlePayCart,
            handleDeleteCart,
            handleCartInfo,
            state: { query, ducks, duck, favs, ducksFavs, cart, shoppingCart, checkoutCart, cartInfo },
            props: { lang, name, onLogout }
        } = this

        const { title, hello, logout, favorites, showCart } = literals[lang]

        return <main className="home">
            <h1>{title}</h1>
            <h2>{hello}, {name}!</h2>
            <button onClick={onLogout}>{logout}</button>
            <button onClick={handleShowFavorites}>{favorites}</button>
            <button onClick={handleShowCart}>{showCart}</button>
            <Search lang={lang} query={query} onSearch={handleSearch} />
            {!duck && ducks && (ducks.length && <Results  lang={lang} items={ducks} isResFav={false} onItem={handleRetrieve} onFav={handleToggleFav} favs={favs} onCart={handleToggleCart} cart={cart} /> || <p>No results.</p>)}
            {!duck && !ducks && ducksFavs && (ducksFavs.length && <Results  lang={lang} items={ducksFavs} isResFav={true} onItem={handleRetrieve} onFav={handleToggleFav} favs={ducksFavs} /> || <p>No results.</p>)}
            {!duck && !ducks && !ducksFavs && !checkoutCart && shoppingCart && <ShoppingCart lang={lang} items={shoppingCart} onCart={handleToggleCart} cart={shoppingCart} onCheckout={handleCheckout} onDeleteCart={handleDeleteCart} />}
            {!duck && !ducks && !ducksFavs && shoppingCart && checkoutCart && <CheckoutCart lang={lang} onPayment={handlePayCart} />}
            {cartInfo && <CheckoutCartInfo lang={lang} info={cartInfo} onOk={handleCartInfo} />}
            {duck && <Detail item={duck} />}
        </main>
    }
}

export default withRouter(Home)