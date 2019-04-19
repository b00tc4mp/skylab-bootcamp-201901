"use strict";

const userApi = {
  __url__: "https://skylabcoders.herokuapp.com/api/user",

  __call__(method, path, callback, body, auth) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${this.__url__}${path}`);
    xhr.addEventListener("load", function() {
      const result = JSON.parse(this.responseText);
      callback(result);
    });
    if (method === 'GET' && !!body) throw Error('cannot send body in GET request');
    if (body) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  },

  register(userData, callback) {
    const path = "";
    this.__call__('POST', path, callback, userData);
  }
};
