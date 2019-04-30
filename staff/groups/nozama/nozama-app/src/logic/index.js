import userApi from '../data/user-api';
import productApi from '../data/product-api';
import validate from '../common/validate';
import { LogicError } from '../common/errors';
import Product from './Product';
import ProductWithDetail from './ProductWithDetail';

const logic = {
  __userId__: null,
  __userToken__: null,

  get userId() {
    return logic.__userId__;
  },
  set userId(id) {
    logic.__userId__ = id;
  },

  get token() {
    return logic.__userToken__;
  },
  set token(_token) {
    logic.__userToken__ = _token;
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

  retrieveUser() {
    return userApi.retrieve(logic.userId, logic.token).then(res => res.data);
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

    return userApi.updateAndCheckDeleted(logic.userId, logic.token, dataUser);
  },

  // ********************************

  allProducts() {
    return productApi.all().then(products => products.map(info => new Product(info)));
  },

  findProduct(id) {
    return productApi.findOne(id).then(info => new Product(info));
  },

  detailProduct(id) {
    return productApi.detail(id)
      .then(info => new ProductWithDetail(info));
  },

  searchProduct(text){
      return productApi.search(text)
        .then(products => products.map(info => new Product(info)));
  }
};

export default logic;
