import userApi from '../data/user-api';
import productApi from '../data/product-api';
import validate from '../common/validate';
import normalize from '../common/normalize'
import { LogicError } from '../common/errors';
import Product from './product/Product';
import ProductWithDetail from './product/ProductWithDetail';

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
        return true;
      }
      logic.userId = null;
      logic.token = null;
      return res.error;
    });
  },

  logOut() {
    logic.userId = null;
    logic.token = null;
  },

  retrieveUser() {
    return userApi.retrieve(logic.userId, logic.token)
      .then(res => res.data);
  },

  updateUser(dataUser) {
    validate.arguments([
      {
        name: 'dataUser',
        value: dataUser,
        type: 'object',
        notEmpty: true,
      },
      {
        name: 'dataUser.password',
        value: dataUser.password,
        type: 'string',
        notEmpty: true,
        optional: true,
      },
    ]);
    return logic.retrieveUser()
      .then(user => userApi.updateAndCheckDeleted(logic.userId, logic.token, {...user, ...dataUser}));
  },

  // ***********************

  saveCart(newCart) {
    if (!logic.isLoggedIn) return false;
    return logic.updateUser({cart: newCart});
  },

  saveHistoryCart(newCart) {
    logic.retrieveUser()
      .then(user => {
        if (!user.historicCarts) user.historicCarts = [];
        user.historicCarts.push(newCart);
        return logic.updateUser(user);
      })
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
