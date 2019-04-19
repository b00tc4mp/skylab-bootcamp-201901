"use strict";

const logic = {
  register(name, surname, email, password) {
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

  login(email, password) {
    email = typeof email === "string" ? email.trim() : null;
    if (!email) throwError(4, "email not provided");

    password = typeof password === "string" ? password.trim() : null;
    if (!password) throwError(5, "password not provided");

    const user = users.find(user => user.email === email);

    if (!user) throwError(1, "wrong credentials");

    if (user.password === password) {
      this.__userName__ = user.name;
      this.__userEmail__ = email;
      this.__accessTime__ = Date.now();
    } else throwError(1, "wrong credentials");
  },

  logout() {
    this.__userName__ = null;
    this.__userEmail__ = null;
    this.__accessTime__ = null;
  },

  searchDucks(query, callback) {
    if (typeof query === "undefined")
      throw Error("undefined is not a valid query");
    if (!(callback instanceof Function))
      throw Error("callback is not a function");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://duckling-api.herokuapp.com/api/search?q=" + query);
    xhr.addEventListener("load", function() {
      const result = JSON.parse(this.responseText);
      callback(result.map(item =>  {
        return (          {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          });
        }));
    });
    xhr.send();
  },

  retrieveDuckDetail(id, callback) {
    if (typeof id === "undefined") throw Error("undefined is not a valid id");
    if (!(callback instanceof Function))
      throw Error("callback is not a function");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://duckling-api.herokuapp.com/api/ducks/" + id);
    xhr.addEventListener("load", function() {
      const result = JSON.parse(this.responseText);
      callback({
        id: result.id,
        title: result.title,
        imageUrl: result.imageUrl,
        price: result.price,
        description: result.description
      });
    });
    xhr.send();
  }
};

function throwError(code, message) {
  const err = Error(message);
  err.code = code;
  throw err;
}
