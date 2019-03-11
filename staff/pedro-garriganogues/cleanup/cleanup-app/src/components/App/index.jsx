

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Register from '../Register'
import Login from '../Login'
import About from '../About'
// import Products from '../Products'
import Landing from '../Landing/index'
import Navbar from '../Navbar/index'
import Contact from '../Contact'
import Footer from '../Footer'
import Profile from '../Profile'
import Cart from '../Cart'
import Product from '../Product'
import Totalproducts from '../Totalproducts'







import logic from '../../logic'
class App extends Component {
    state = { registerFeedback: null }


    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => this.props.history.push('/login'))
                .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleLogin = (email, password) => {
        try {
            logic.logInUser(email, password)
                .then(() => this.props.history.push('/'))
                .catch(({ message }) => this.setState({ loginFeedback: message }))
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    // onAddToCart = id => {
    //     logic.addProductToCart(id)
    //       .then(() => {

    //         this.setState({ cartLength: logic.cart().length })

    //         this.getItems()

    //         var cart = $(".fa-shopping-cart")
    //         var imgtodrag = $('#img-' + id);

    //         if (imgtodrag !== 'undefined') {

    //           var imgclone = imgtodrag.clone()
    //             .offset({
    //               top: imgtodrag.offset().top,
    //               left: imgtodrag.offset().left
    //             })
    //             .css({
    //               'opacity': '0.5',
    //               'position': 'absolute',
    //               'height': '200px',
    //               'width': '200px',
    //               'z-index': '100000'
    //             })
    //             .appendTo("body")
    //             .animate({
    //               'top': cart.offset().top - 10,
    //               'left': cart.offset().left - 10,
    //               'width': 30,
    //               'height': 30
    //             }, 1000, "linear");

    //           setTimeout(function () {
    //             $(imgclone).remove()
    //           }, 1000)

    //         }
    //       })
    //       .catch(err => swal(err.message))
    //   }

    //   onRemoveFromCart = id => {
    //     logic.removeProductFromCart(id);

    //     this.getItems();
    //   }


    render() {
        const { state: { loginFeedback, registerFeedback }, handleLogin, handleRegister } = this

        return (<main className="app">
            <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout} cartLength={this.state.cartLength} />
            <Landing />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            {/* <Route exact path="/product" component={Product} /> */}
            {/* <Route exact path="/products" component={Products} /> */}
            <Route exact path="/profile" component={Profile} />

            <Route exact path="/products" render={props => <Totalproducts categoryId={props.match.params.id} />} />
            <Route exact path="/product/:id" render={props => <Product productId={props.match.params.id} />} />

            <Route exact path="/cart" component={Cart} />
            <Route exact path="/register" render={() => <Register title='Register' onRegister={handleRegister} feedback={registerFeedback} />} />
            <Route exact path="/login" render={() => <Login onLogin={handleLogin} feedback={loginFeedback} />} />
            <Footer />
        </main>)
    }
}

export default withRouter(App)