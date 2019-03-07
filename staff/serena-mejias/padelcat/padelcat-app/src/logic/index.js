import padelcatApi from "../padelcat-api";

const logic = {
  TOKEN_KEY: "token",

  registerPlayer(
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) {
    // validate([
    //   { key: "name", value: name, type: String },
    //   { key: "surname", value: surname, type: String },
    //   { key: "email", value: email, type: String },
    //   { key: "password", value: password, type: String },
    //   { key: "passwordConfirm", value: passwordConfirm, type: String }
    //   { key: "preferedPosition", value: preferedPosition, type: String }
    //   { key: "link", value: link, type: String }
    // ]);
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string")
      throw TypeError(surname + " is not a string");

    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirm !== "string")
      throw TypeError(passwordConfirm + " is not a string");

    if (!passwordConfirm.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirm) throw Error("passwords do not match");

    if (typeof preferedPosition !== "string")
      throw TypeError(preferedPosition + " is not a string");

    if (!preferedPosition.trim().length)
      throw Error("preferedPosition cannot be empty");

    if (typeof link !== "string") throw TypeError(link + " is not a string");

    if (!link.trim().length) throw Error("link cannot be empty");

    return padelcatApi
      .registerPlayer(
        name,
        surname,
        email,
        password,
        passwordConfirm,
        preferedPosition,
        link
      )
      .then(() => {});
  },

  loginPlayer(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return padelcatApi.authenticatePlayer(email, password);
  },

  // apiLogin() {
  //   new Promise(resolve => resolve({ token: "tokenKey" }));
  // },
  getStoredtoken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  },
  storeToken(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  },

  retrieveMatches() {
    const tokenprob = logic.getStoredtoken()
    return padelcatApi.retrieveMatchesScrapping(tokenprob)
  }
};

export default logic;
