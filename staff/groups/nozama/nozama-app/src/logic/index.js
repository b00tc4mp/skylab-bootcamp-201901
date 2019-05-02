import userApi from '../data/user-api';
import productApi from '../data/product-api';
import validate from '../common/validate';
import normalize from '../common/normalize'
import { LogicError, InvalidTokenError } from '../common/errors';
import Product from './product/Product';
import ProductWithDetail from './product/ProductWithDetail';
import { CART_IMPORT, GLOBAL_LOGOUT } from './actions';

const logic = {

  get userId() {
    return normalize.undefinedOrNull(sessionStorage.__userId__);
  },
  set userId(id) {
    sessionStorage.__userId__ = id;
  },

  get token() {
    return normalize.undefinedOrNull(sessionStorage.__token__);
  },
  set token(_token) {
    sessionStorage.__token__ = _token;
  },

  get isLoggedIn() {
    return !!logic.userId;
  },

  registerUser(email, password, name, surname) {
    validate.arguments([
      {
        name: 'email',
        value: email,
        type: 'string',
        notEmpty: true,
      },
      {
        name: 'password',
        value: password,
        type: 'string',
        notEmpty: true,
      },
      {
        name: 'name',
        value: name,
        type: 'string',
        notEmpty: true,
      },
      {
        name: 'surname',
        value: surname,
        type: 'string',
        notEmpty: true,
      },
    ]);
    validate.email(email);

    return userApi
      .create(email, password, {
        name,
        surname,
      })
      .then(res => {
        if (res.status === 'OK') return;
        throw new LogicError(res.error);
      });
  },

  loginUser(email, password) {
    validate.arguments([
      {
        name: 'email',
        value: email,
        type: 'string',
        notEmpty: true,
      },
      {
        name: 'password',
        value: password,
        type: 'string',
        notEmpty: true,
      },
    ]);
    return userApi.auth(email, password).then(res => {
      if (res.status === 'OK') {
        logic.userId = res.data.id;
        logic.token = res.data.token;
        return 'OK';
      }
      logic.userId = null;
      logic.token = null;
      return res.error;
    }).then(res => ((res === 'OK') ? logic.retrieveUser() : res))
  },

  logOut() {
    logic.userId = null;
    logic.token = null;
  },

  retrieveUser() {
    return userApi.retrieve(logic.userId, logic.token)
      .then(res => res.data)
      .then(user => {
        if (!user.cart || (user.cart.length === 0)) {
          user.cart = [];
          return Promise.resolve(user);
        }
        const fetchProducts = [];
        for (let line of user.cart) {
          const productPromise = logic.detailProduct(line.productId);
          fetchProducts.push(productPromise);
        }
        return Promise.all(fetchProducts)
          .then ((products) => {
            const fetchedCart = [];
            for (let ii=0, ll=user.cart.length; ii < ll; ii++) {
                fetchedCart[ii] = {product: products[ii], quantity: user.cart[ii].quantity}
            }
            user.cart = fetchedCart;
            return user;
          })
      })
      .then(user => {
        if (logic.cart.length === 0) {

          logic.dispatch({action: CART_IMPORT, cart: user.cart})
        }
        return user;
      })
      .catch(error => {
        if (error instanceof InvalidTokenError) logic.dispatch({action: GLOBAL_LOGOUT})

      });
  },

  updateUser(dataUser) {
    validate.arguments([
      { name: 'dataUser', value: dataUser, type: 'object', notEmpty: true,},
      { name: 'dataUser.password', value: dataUser.password, type: 'string', notEmpty: true, optional: true,},
    ]);
    let slimCart = dataUser.cart;
    if (dataUser.historicCarts && dataUser.cart.length !== 0 && !!dataUser.cart[0].product) {
      slimCart = dataUser.cart.map(({product, quantity}) => ({quantity, productId: product.productId}));
    }

    let slimHistoricCarts = dataUser.historicCarts || [];
    if (dataUser.historicCarts && dataUser.historicCarts.length !== 0) {
      slimHistoricCarts = []
      for (let ii=0, ll=dataUser.historicCarts.length; ii < ll; ii++) {
        let {cart, payDetails} = dataUser.historicCarts[ii];
        if (!cart[0].productId) {
          cart = cart.map(({product, quantity}) => ({quantity, productId: product.productId}));
        }
        slimHistoricCarts.push({cart, payDetails});
      }
    }
    return logic.retrieveUser()
      .then(user => {
        let composedUser = {...user, ...dataUser };
        if (dataUser.cart) composedUser = {...composedUser, cart: slimCart};
        if (dataUser.historicCarts) composedUser = {...composedUser, historicCarts: slimHistoricCarts};
        return userApi.updateAndCheckDeleted(logic.userId, logic.token, composedUser);
      })
    },

  // ***********************

  saveCart(newCart) {
    if (!logic.isLoggedIn) return false;
    const slimCart = newCart.map(({product, quantity}) => ({quantity, productId: product.productId}));
    return logic.updateUser({cart: slimCart});
  },

  // ********************************

  allProducts() {
    return productApi.all().then(products => products.map(info => new Product(info)));
  },

  findProduct(id) {
    return productApi.findOne(id).then(info => {
      console.log(id);
      new Product(info)
    });
  },

  detailProduct(id) {
    return productApi.detail(id)
      .then(info => new ProductWithDetail(info));
  },

  searchProduct(text) {
      return productApi.search(text)
        .then(products => products
            .map(info => new Product(info))
            .filter(product => !!product.__info__));
  },

  categories () {
    return logic.allProducts()
      .then(products => {
        return products.reduce((acc, product) => {
          const category = product.subtitle.trim();
          if (!acc.includes(category)) acc.push(category);
          return acc;
        }, [])
      })
  },
};

export default logic;
