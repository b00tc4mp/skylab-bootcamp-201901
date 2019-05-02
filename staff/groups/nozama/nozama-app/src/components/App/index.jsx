import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Landing from '../../pages/Landing';
import Login from '../Login';
import Register from '../Register';
import Home from '../../pages/Home';
import logic from '../../logic';
import Cart from '../../pages/Cart'
import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_UPDATE_PRODUCT,
  CART_CHECKOUT,
  FAVORITES_TOGGLE_PRODUCT,
} from '../../logic/actions';
import DetailScreen from '../../pages/DetailScreen'

function App(props) {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);

  const dispatch = ({ action, ...params }) => {
    const calculateCartQuantity = cart => cart.reduce((acc, item) => acc + item.quantity, 0);

    switch (action) {
      case CART_ADD_PRODUCT:
        {
          const { product, quantity } = params;
          const newCart = [...cart];
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index === -1) {
            newCart.push({ product, quantity });
          } else {
            const oldQuantity = newCart[index].quantity;
            const newQuantity = oldQuantity + quantity;
            if (newQuantity !== 0) newCart[index] = { product, quantity: newQuantity };
            else newCart.splice(index, 1);
          }
          setCart(newCart);
          setCartQuantity(calculateCartQuantity(newCart));
        }
        break;
      case CART_REMOVE_PRODUCT:
        {
          const { product } = params;
          const newCart = [...cart];
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index !== -1) newCart.splice(index, 1);
          setCart(newCart);
          setCartQuantity(calculateCartQuantity(newCart));
        }
        break;
      case CART_UPDATE_PRODUCT:
        {
          const { product, quantity } = params;
          const newCart = [...cart];
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index !== -1) newCart[index].quantity = quantity;
          setCart(newCart);
          setCartQuantity(calculateCartQuantity(newCart));
        }
        break;
      case CART_CHECKOUT:
        break;
      case FAVORITES_TOGGLE_PRODUCT:
        {
          const { product } = params;
          const index = favorites.findIndex(item => item.productId === product.productId);
          let newFavorites = [...favorites];
          if (index === -1) newFavorites.push(product)
            else newFavorites.splice(index,1);
          setFavorites(newFavorites);
        }
        break;

      default:
        return;
    }
  };

  const handleLogin = (email, password) => logic.loginUser(email, password);

  return (
    <Container>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
          
            return !logic.isLoggedIn ? (
              <DetailScreen />
            ) : (
              <Redirect to="/home" />
            )
          }}
        />
        <Route
          path="/logout"
          render={() => {
            logic.logOut();
            return <Redirect to="/" />;
          }}
        />
        <Route
          path="/register"
          render={() => (!logic.isLoggedIn ? <Register /> : <Redirect to="/home" />)}
        />
        <Route
          path="/login"
          render={() => (!logic.isLoggedIn ? <Login /> : <Redirect to="/home" />)}
        />
        <Route
          path="/home"
          render={() => {
            return logic.isLoggedIn ? <Home /> : <Redirect to="/" />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}

export default withRouter(App);
