import userApi from '../data/user-api';
import validate from '../common/validate';
import {
  LogicError
} from '../common/errors';

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
    return logic.__isLogged__;
  },
  set isLoggedIn(_isLoggedIn) {
    logic.__isLoggedIn__ = _isLoggedIn;
  },

  registerUser(email, password, name, surname) {
    validate.arguments([{
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
    validate.arguments([{
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
      logic.userId = res.data.id;
      logic.token = res.data.token;
      return true;
    });
  },

  retrieveUser() {
    return userApi.retrieve(logic.userId, logic.token).then(res => res.data);
  },

  updateUser(dataUser) {
    validate.arguments([{
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
};

export default logic;