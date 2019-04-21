"use strict";

const logic = {
  /**
   * 
   * @param {string} name 
   * @param {string} surname 
   * @param {string} email 
   * @param {string} password 
   * @param {Function} callback 
   */
  registerUser(name, surname, email, password, callback) {
    validate.arguments([
      { name: "name", value: name, type: "string", notEmpty: true },
      { name: "surname", value: surname, type: "string", notEmpty: true },
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
      { value: callback, type: "function" },
    ]);

    validate.email(email);

    userApi.create(name, surname, email, password, function(response) {
      if (response.status === "OK") callback();
      else callback(Error(response.error));
    });
  },

  /**
   * 
   * @param {string} email 
   * @param {string} password 
   * @param {Function} callback 
   */
  loginUser(email, password, callback) {
    validate.arguments([
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
      { value: callback, type: "function" },
    ]);

    userApi.authenticate(email, password, response => {
      if (response.error) {
        callback({
          status: "KO",
          error: response.error,
        });
      } else {
        const { data: { id: userId, token }} = response;
        this.__userId__ = userId;
        this.__token__ = token,
        this.retrieveUser(() => {
          callback();
        });
      }
    });
  },

  /**
   * 
   * @param {string} id 
   * @param {string} token 
   * @param {Function} callback 
   */
  retrieveUser(callback) {
    validate.arguments([
      { value: callback, type: "function" },
    ]);

    userApi.retrieve(logic.__userId__, logic.__token__, (response) => {
      if (response.status === "OK") {
        this.__user__ = {
          name: response.data.name,
          surname: response.data.surname,
          email: response.data.username,    
        };
        callback();
      } else callback(response);
    })
  },

  searchDucks(query, callback) {
    // TODO validate inputs

    // TODO handle api errors
    duckApi.searchDucks(query, callback);
  },

  retrieveDuck(id, callback) {
    // TODO validate inputs

    // TODO handle api errors
    duckApi.retrieveDuck(id, callback);
  },
};
