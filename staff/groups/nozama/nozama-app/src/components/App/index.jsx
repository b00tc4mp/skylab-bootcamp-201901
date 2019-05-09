import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Nav from '../../components/Nav';
import Landing from '../../pages/Landing';
import Login from '../Login';
import Register from '../Register';
import DetailScreen from '../../pages/DetailScreen';
import Cart from '../../pages/Cart';
import Checkout from '../Payment';
import SearchPage from '../../pages/SearchPage';
import ThanksPage from '../../pages/ThanksPage';
import UserProfile from '../../pages/UserProfile';
import logic from '../../logic';
import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_UPDATE_PRODUCT,
  CART_CONFIRMED_PAY,
  CART_RETRIEVE,
  CART_IMPORT,
  FAVORITES_TOGGLE_PRODUCT,
  GLOBAL_LOGOUT,
} from '../../logic/actions';

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
          const newCart = cart;
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index === -1) {
            newCart.push({ product, quantity });
          } else {
            const oldQuantity = newCart[index].quantity;
            const newQuantity = oldQuantity + quantity;
            if (newQuantity !== 0) newCart[index] = { product, quantity: newQuantity };
            else newCart.splice(index, 1);
          }
          logic
            .saveCart(newCart)
            .then(() => setCart(newCart))
            .then(() => setCartQuantity(calculateCartQuantity(newCart)));
        }
        break;
      case CART_REMOVE_PRODUCT:
        {
          const { product } = params;
          const newCart = cart;
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index !== -1) newCart.splice(index, 1);
          logic
            .saveCart(newCart)
            .then(() => setCart(newCart))
            .then(() => setCartQuantity(calculateCartQuantity(newCart)));
        }
        break;
      case CART_UPDATE_PRODUCT:
        {
          const { product, quantity } = params;
          const newCart = cart;
          const index = newCart.findIndex(item => item.product.productId === product.productId);
          if (index !== -1) newCart[index].quantity = quantity;
          setCart(newCart);
          setCartQuantity(calculateCartQuantity(newCart));
          logic.saveCart(newCart);
        }
        break;
      case CART_RETRIEVE:
        logic.retrieveUser().then(user => {
          if (user.cart) {
            setCart([...user.cart]);
            setCartQuantity(calculateCartQuantity(user.cart));
          } else {
            setCart([]);
            setCartQuantity(calculateCartQuantity(0));
          }
        });
        break;

      case CART_IMPORT:
        setCart(params.cart);
        setCartQuantity(calculateCartQuantity(params.cart));
        break;

      case CART_CONFIRMED_PAY:
        const newCart = [...cart];
        let historicCarts = [];
        logic
          .retrieveUser()
          .then(user => {
            if (user.historicCarts) historicCarts = [...user.historicCarts];
            historicCarts.push({
              cart: newCart,
              payDetails: { ...params, date: new Date(), numItems: cartQuantity },
            });
            return logic.updateUser({ cart: [], historicCarts });
          })
          .then(() => {
            setCart([]);
            setCartQuantity(0);
            props.history.push('/thanks');
          });
        break;

      case FAVORITES_TOGGLE_PRODUCT:
        {
          const { product } = params;
          const index = favorites.findIndex(item => item.productId === product.productId);
          let newFavorites = [...favorites];
          if (index === -1) newFavorites.push(product);
          else newFavorites.splice(index, 1);
          setFavorites(newFavorites);
        }
        break;

      case GLOBAL_LOGOUT:
        logic.logOut();
        setCart([]);
        setCartQuantity(0);
        break;

      default:
        return;
    }
  };

  logic.dispatch = dispatch;
  logic.cart = cart;

  useEffect(() => {
    if (logic.isLoggedIn) {
      logic.retrieveUser();
    }
  }, []);

  return (
    <div className="container">
      <Nav cartQuantity={cartQuantity} />
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Landing {...props} cart={cart} cartQuantity={cartQuantity} dispatch={dispatch} />
          )}
        />
        <Route
          path="/detailProduct/:productId"
          render={props => <DetailScreen {...props} dispatch={dispatch} />}
        />
        <Route
          path="/cart"
          render={props => (
            <Cart {...props} cart={cart} cartQuantity={cartQuantity} dispatch={dispatch} />
          )}
        />
        <Route
          path="/checkout"
          render={props => {
            if (!logic.isLoggedIn) return <Redirect to="/login/checkout" />;
            return <Checkout {...props} cart={cart} dispatch={dispatch} />;
          }}
        />
        <Route path={'/search/:text'} render={props => <SearchPage {...props} />} />
        <Route
          path={['/register/:afterGoTo', '/register/']}
          render={props => (!logic.isLoggedIn ? <Register {...props} /> : <Redirect to="/" />)}
        />
        <Route
          path={['/login/:afterGoTo', '/login/']}
          render={props => (!logic.isLoggedIn ? <Login {...props} /> : <Redirect to="/" />)}
        />
        <Route
          path="/thanks"
          render={() => (logic.isLoggedIn ? <ThanksPage /> : <Redirect to="/" />)}
        />
        <Route
          path="/userProfile"
          render={() => (logic.isLoggedIn ? <UserProfile /> : <Redirect to="/" />)}
        />
        <Route
          path="/logout"
          render={() => {
            dispatch({ action: GLOBAL_LOGOUT });
            return <Redirect to="/" />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
