import validate from '../common/validate';
import normalize from '../common/normalize';
import { LogicError } from '../common/errors';
import restApi from '../data/rest-api';
import { RequirementError } from '../common/errors';

const logic = {
  /**
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   */
  registerUser(name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    validate.email(email);

    return restApi.createUser(name, surname, email, password).then(response => {
      if (response.message) return undefined;
      throw new LogicError(response.error);
    });
  },

  /**
   *
   * @param {string} email
   * @param {string} password
   */
  loginUser(email, password) {
    validate.arguments([
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    return restApi.loginUser(email, password).then(response => {
      if (response.error) throw new LogicError(response.error);
      const { token } = response;
      this.__token__ = token;
      return undefined;
    });
  },

  /**
   *
   * @param {string} id
   * @param {string} token
   */
  retrieveUser() {
    return restApi.retrieveUser(this.__token__).then(res => {
      if (res.error) throw new LogicError(res.error);
      return res;
    });
  },

  updateUser(name, surname, email, password) {
    validate.arguments([
      { name: 'name', value: name, type: 'string', notEmpty: true },
      { name: 'surname', value: surname, type: 'string', notEmpty: true },
      { name: 'email', value: email, type: 'string', notEmpty: true },
      { name: 'password', value: password, type: 'string', notEmpty: true },
    ]);

    return restApi.updateUser(this.__token__, name, surname, email, password);
  },

  retrieveCart() {
    return restApi.retrieveCart(this.__token__);
  },

  saveCart(cart) {
    return restApi.saveCart(this.__token__, cart);
  },

  addToCart(duck) {
    return restApi.addToCart(this.__token__, duck.id);
  },

  subtractFromCart(duck) {
    return restApi.subtractFromCart(this.__token__, duck.id);
  },

  removeFromCart(duck) {
    return restApi.removeFromCart(this.__token__, duck.id);
  },

  logout() {
    this.__token__ = null;
  },

  isFavorite(duck) {
    validate.arguments([{ name: 'duck', value: duck, type: 'object', notEmpty: true }]);
    return logic.retrieveFavDucks().then(ducks => ducks.some(_duck => _duck.id === duck.id));
  },

  retrieveFavDucks() {
    return restApi.retrieveFavDucks(logic.__token__);
  },

  toggleFavorite(duck) {
    if (typeof duck !== 'string' && (typeof duck !== 'object' || duck == null))
      throw new RequirementError('id|duck is not optional');
    const duckId = duck.id || duck;
    return restApi.toggleDuck(logic.__token__, duckId);
  },

  get isLogged() {
    return !!this.__token__;
  },

  get __token__() {
    return normalize.undefinedOrNull(sessionStorage.__token__);
  },
  set __token__(token) {
    sessionStorage.__token__ = token;
  },

  searchDucks(query) {
    validate.arguments([{ name: 'query', value: query, type: 'string', optional: false }]);

    return restApi.searchDucks(logic.__token__, query);
  },

  retrieveDuck(id) {
    validate.arguments([{ name: 'id', value: id, type: 'string', notEmpty: false }]);

    return restApi.retrieveDuck(logic.__token__, id);
  },
};

export default logic;
