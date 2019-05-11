//@ts-check

const validate = require('../common/validate');
const userApi = require('../data/user-api');
const duckApi = require('../data/duck-api');
const { LogicError } = require('../common/errors');
const token = require('../common/token');

class Logic {
  constructor(token) {
    this.__userToken__ = token;
  }

  get __userId__() {
    if (this.__userToken__) {
      const payload = token.payload(this.__userToken__);

      return payload.id;
    }
  }

  get isUserLoggedIn() {
    return !!this.__userToken__;
  }

  registerUser(name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    validate.email(email);

    return userApi.create(email, password, { name, surname })
      .then(({ status, error}) => {
        if (status === 'OK') return
        else throw new LogicError(error);
    });
  }

  loginUser(email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    validate.email(email);

    return userApi.authenticate(email, password)
    .then(res => {
      if (res.status === 'OK') {
        const {
          data: { token },
        } = res;

        this.__userToken__ = token;
      } else throw new LogicError(res.error);
    });
  }

  retrieveUser() {
    return userApi.retrieve(this.__userId__, this.__userToken__)
      .then(({status, data: userData, error}) => {
        if (status === 'OK') {
          const { name, surname, username: email, favs = [] } = userData;
          return { name, surname, email, favs };
        } else throw new LogicError(error);
      });
  }

  populateCart(cart) {
    return Promise.all(cart.map(line => this.retrieveDuck(line.duckId)))
      .then(ducks =>
        cart.map((line, i) => ({
          duck: { ...ducks[i], image: ducks[i].imageUrl },
          quantity: line.quantity,
        }))
    ); 
  }

  slimCart(cart) {
    return cart.map(({ duck, quantity }) => ({ duckId: duck.id, quantity }));
  }

  retrieveCart() {
    return userApi.retrieve(this.__userId__, this.__userToken__)
      .then(({ status, data: userData, error }) => {
        if (status === 'OK') return this.populateCart(userData.cart);
        else throw new LogicError(error);
      });
  }

  saveCart(cart) {
    return userApi.update(this.__userId__, this.__userToken__, { cart: this.slimCart(cart) });
  }

  pushToHistoricCarts(cart, payment) {
    return userApi
      .retrieve(this.__userId__, this.__userToken__)
      .then(({ status, data: userData, error }) => {
        if (status === 'OK') return userData.historicCarts || [];
        else throw new LogicError(error);
      })
      .then(historicCarts => {
        const newHistoricCart = { cart: this.slimCart(cart), payment };
        historicCarts.push(newHistoricCart);
        return userApi.update(this.__userId__, this.__userToken__, { historicCarts });
      });
  }

  retrieveHistoricCarts() {
    return userApi
      .retrieve(this.__userId__, this.__userToken__)
      .then(({ status, data: userData, error }) => {
        if (status === 'OK')
          return userData.historicCarts.map(({ cart, payment }) => ({
            cart: this.populateCart(cart), payment
          }));
        else throw new LogicError(error);
      });
  }
  
  searchDucks(query) {
    validate.arguments([{ name: 'query', value: query, type: 'string' }]);

    return duckApi.searchDucks(query).then(ducks => (ducks instanceof Array ? ducks : []));
  }

  retrieveDuck(id) {
    validate.arguments([{ name: 'id', value: id, type: 'string' }]);

    return duckApi.retrieveDuck(id);
  }

  toggleFavDuck(id) {
    validate.arguments([{ name: 'id', value: id, type: 'string' }]);

    return userApi.retrieve(this.__userId__, this.__userToken__).then(response => {
      const { status, data } = response;

      if (status === 'OK') {
        const { favs = [] } = data; // NOTE if data.favs === undefined then favs = []

        const index = favs.indexOf(id);

        if (index < 0) favs.push(id);
        else favs.splice(index, 1);

        return userApi.update(this.__userId__, this.__userToken__, { favs }).then(() => {});
      }

      throw new LogicError(response.error);
    });
  }

  retrieveFavDucks() {
    return userApi.retrieve(this.__userId__, this.__userToken__).then(response => {
      const { status, data } = response;

      if (status === 'OK') {
        const { favs = [] } = data;

        if (favs.length) {
          const calls = favs.map(fav => duckApi.retrieveDuck(fav));

          return Promise.all(calls);
        } else return favs;
      }

      throw new LogicError(response.error);
    });
  }
}

module.exports = Logic;
