const padelcatApi = {
  url: "http://192.168.0.249:8000/api",

  registerPlayer(
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) {
    if (typeof name !== "string") throw TypeError(`${name} is not a string`);
    if (!name.trim().length) throw Error("name is empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not a string`);
    if (!surname.trim().length) throw Error("surname is empty");

    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");

    if (typeof passwordConfirm !== "string")
      throw TypeError(`${passwordConfirm} is not a string`);
    if (!passwordConfirm.trim().length)
      throw Error("password confirm is empty");

    return fetch(`${this.url}/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
        passwordConfirm,
        preferedPosition,
        link
      })
    })
      .then(res => res.json())
      .then(({ id, error }) => {
        if (error) throw Error(error);
        return id;
      });
  },

  authenticatePlayer(email, password) {
    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");

    return fetch(`${this.url}/authenticate`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) throw Error(response.error);

        return response.token;
      });
  },

  retrieveMatches() {
    return fetch(`${this.url}/retrieveMatches`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
      //body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) throw Error(response.error);

        return response;
      });
  }
};

export default padelcatApi;