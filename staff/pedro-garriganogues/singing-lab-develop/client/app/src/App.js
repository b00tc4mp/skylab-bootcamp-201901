import React, { Component } from 'react';
import { Landing, Register, Login, Categories, Products, ProductData, OurTeam, Profile, Cart, Order, Navbar, AllProducts } from './components'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import logic from './logic'
import swal from 'sweetalert2'
import $ from 'jquery'


class App extends Component {
  state = {
    cart: [],
    total: [],
    loggedIn: logic.loggedIn,
    cartLength: logic.cart().length,
  }

  componentDidMount() {
    this.getItems()
  }

  onLogin = () => {
    this.setState({ loggedIn: true })

    this.props.history.push('/')
  }

  onLogout = () => {
    this.setState({ loggedIn: false })
  }

  onOrder = () => {
    logic.clearCart()

    logic._cart.length = 0;

    this.getItems()

    this.props.history.push('/')
  }

  getItems = () => {
    if (logic._cart.length && logic._cart !== 'undefined') {
      logic.listProductsByIds()
        .then(cart => this.setState({ cart, total: [], cartLength: logic.cart().length }))
    } else {
      this.setState({ cart: [], total: [], cartLength: logic.cart().length })
    }
  }

  onAddToCart = id => {
    logic.addProductToCart(id)
      .then(() => {

        this.setState({ cartLength: logic.cart().length })

        this.getItems()

        var cart = $(".fa-shopping-cart")
        var imgtodrag = $('#img-' + id);

        if (imgtodrag !== 'undefined') {

          var imgclone = imgtodrag.clone()
            .offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left
            })
            .css({
              'opacity': '0.5',
              'position': 'absolute',
              'height': '200px',
              'width': '200px',
              'z-index': '100000'
            })
            .appendTo("body")
            .animate({
              'top': cart.offset().top - 10,
              'left': cart.offset().left - 10,
              'width': 30,
              'height': 30
            }, 1000, "linear");

          setTimeout(function () {
            $(imgclone).remove()
          }, 1000)

        }
      })
      .catch(err => swal(err.message))
  }

  onRemoveFromCart = id => {
    logic.removeProductFromCart(id);

    this.getItems();
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} onLogout={this.onLogout} cartLength={this.state.cartLength} />
        <Switch>
          <Route exact path="/" render={() => <Landing onAddToCart={this.onAddToCart} />} />
          <Route exact path="/our-team" component={OurTeam} />
          <Route exact path="/auth" render={() => <Login onLogin={this.onLogin} />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/cart" render={() => <Cart loggedIn={this.state.loggedIn} onRemoveFromCart={this.onRemoveFromCart} cart={this.state.cart} total={this.state.total} />} />
          <Route exact path="/order" render={() => this.state.loggedIn ? <Order onOrder={this.onOrder} /> : <Redirect to="/" />} />
          <Route exact path="/profile" render={() => this.state.loggedIn ? <Route exact path="/profile" component={Profile} /> : <Redirect to="/" />} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/products" render={props => <AllProducts categoryId={props.match.params.id} onAddToCart={this.onAddToCart} />} />
          <Route exact path="/categories/:id" render={props => <Products categoryId={props.match.params.id} onAddToCart={this.onAddToCart} />} />
          <Route exact path="/categories/products/:id" render={props => <ProductData productId={props.match.params.id} onAddToCart={this.onAddToCart} />} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
