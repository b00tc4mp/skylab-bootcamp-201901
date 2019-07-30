import validate from '../common/validate'
import normalize from '../common/normalize'
import userApi from '../data/user-api'
import duckApi from '../data/duck-api'
import { LogicError, FormatError } from '../common/errors'

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
      { name: "name", value: name, type: "string", notEmpty: true },
      { name: "surname", value: surname, type: "string", notEmpty: true },
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
    ]);

    validate.email(email);

    return userApi.create(name, surname, email, password)
      .then(response => {
          if (response.status === "OK") return undefined;
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
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
    ]);

    return userApi.authenticate(email, password)
      .then(response => {
        if (response.error) throw new LogicError(response.error);
        const { data: { id: userId, token }} = response;
        this.__userId__ = userId;
        this.__token__ = token;
        return undefined;
      }
    );
  },

  /**
   *
   * @param {string} id
   * @param {string} token
   */
  retrieveUser() {
    return userApi.retrieve(this.__userId__, this.__token__)
      .then(response => {
        if (response.status !== "OK")  throw new LogicError(response.error);
        
        this.__user__= {};
        const { data } = response;
        for (let key in data) {
          if (key === 'username') this.__user__.email = data[key];
          else if (key !==  'password') this.__user__[key]= data[key];
        }        
        return this.__user__;
      })
      .then(() => Promise.all(this.__user__.favoriteDucks.map(duckId => duckApi.retrieveDuck(duckId))))
      .then(res => this.__user__.favoriteDucks = [...res])
      .then(() => this.__user__);
  },

  updateUser() {
    const user = {...this.__user__, favoriteDucks: this.__user__.favoriteDucks.map(duck => duck.id)};

    return userApi.update(this.__userId__, this.__token__, user)
  },

  logout() {
    this.__userId__ = null;
    this.__token__ = null;
  },

  isFavorite: (duck) => {
    if (!logic.__user__.favoriteDucks) return false;
    const index = logic.__user__.favoriteDucks.findIndex(_duck => _duck.id === duck.id)
    return index !== -1;
  },

  toggleFavorite: (toggleDuck) => {
    if (!logic.__user__.favoriteDucks) logic.__user__.favoriteDucks = [];
    const index = logic.__user__.favoriteDucks.findIndex(duck => duck.id === toggleDuck.id);
    if (index !== -1) {
      logic.__user__.favoriteDucks.splice(index,1)
    } else  {
      logic.__user__.favoriteDucks.push(toggleDuck);
    }
    logic.updateUser();
  },

  get isLogged() {
    return !!(this.__userId__ && this.__token__);
  },

  get __userId__() {
    return normalize.undefinedOrNull(sessionStorage.__userId__);
  },
  set __userId__(id) {
    sessionStorage.__userId__ = id;
  },

  get __token__() {
    return normalize.undefinedOrNull(sessionStorage.__token__);
  },
  set __token__(token) {
    sessionStorage.__token__ = token;
  },

  searchDucks(query) {
    validate.arguments([
      { name: "query", value: query, type: "string", optional: false },
    ]);

    return duckApi.searchDucks(query);
  },

  retrieveDuck(id) {
    validate.arguments([
      { name: "id", value: id, type: "string", notEmpty: false },
    ]);

    return duckApi.retrieveDuck(id)
  },

};

export default logic