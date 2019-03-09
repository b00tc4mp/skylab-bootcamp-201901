import instaApi from "../instafood-api";

const logic = {
  __userId__: null,
  __userApiToken__: null,

  /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  registerUser(name, username, email, password, passwordConfirmation) {
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof username !== "string")
      throw TypeError(username + " is not a string");

    if (!username.trim().length) throw Error("username cannot be empty");

    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirmation !== "string")
      throw TypeError(passwordConfirmation + " is not a string");

    if (!passwordConfirmation.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirmation)
      throw Error("passwords do not match");

    return instaApi
      .registerUser(name, username, email, password, passwordConfirmation)
      .then(() => {});
  },

  /**
   * Logs in the user by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  logInUser(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return instaApi.authenticateUser(email, password).then(({ id, token }) => {
      this.__userId__ = id;
      this.__userApiToken__ = token;
    });
  },

  /**
   * Checks user is logged in.
   */
  get isUserLoggedIn() {
    return !!this.__userId__;
  },

  /**
   * Logs out the user.
   */
  logOutUser() {
    this.__userId__ = null;
    this.__userApiToken__ = null;
  },

  retrieveUser() {
    return instaApi
      .retrieveUser(this.__userId__, this.__userApiToken__)
      .then(({ id, name, username, email, favorites = [] }) => ({
        id,
        name,
        username,
        email,
        favorites
      }));
  }
};

export default logic;
