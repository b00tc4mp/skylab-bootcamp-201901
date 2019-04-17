"use strict";

var logic = {
  register: function(name, surname, email, password) {
    name = typeof name === "string" ? name.trim() : null;
    if (!name) throwError(2, "name not provided");

    surname = typeof surname === "string" ? surname.trim() : null;
    if (!surname) throwError(3, "surname not provided");

    email = typeof email === "string" ? email.trim() : null;
    if (!email) throwError(4, "email not provided");

    password = typeof password === "string" ? password.trim() : null;
    if (!password) throwError(5, "password not provided");

    if (
      users.find(function(user) {
        return user.email === email;
      })
    )
      throwError(5, "email already registered");

    users.push({
      name: name,
      surname: surname,
      email: email,
      password: password
    });
  },

  login: function(email, password) {
    email = typeof email === "string" ? email.trim() : null;
    if (!email) throwError(4, "email not provided");

    password = typeof password === "string" ? password.trim() : null;
    if (!password) throwError(5, "password not provided");

    var user = users.find(function(user) {
      return user.email === email;
    });

    if (!user) throwError(1, "wrong credentials");

    if (user.password === password) {
      this.__userEmail__ = email;
      this.__accessTime__ = Date.now();
    } else throwError(1, "wrong credentials");
  },

  logout: function() {
    this.__userEmail__ = null;
    this.__accessTime__ = null;
  },

  searchDucks: function(query, callback) {
    if (typeof query === 'undefined') throw Error('undefined is not a valid query');
    if (!callback instanceof Function) throw Error('callback is not a function');

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://duckling-api.herokuapp.com/api/search?q=" + query);

    xhr.addEventListener("load", function() {
      callback(JSON.parse(this.responseText));
    });

    xhr.send();
  },

  retrieveDucklingDetail: function(id, callback) {
    // TODO validate inputs

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://duckling-api.herokuapp.com/api/ducks/" + id);

    xhr.addEventListener("load", function() {
      callback(JSON.parse(this.responseText));
    });

    xhr.send();
  }
};

function throwError(code, message) {
  var err = Error(message);
  err.code = code;
  throw err;
}
