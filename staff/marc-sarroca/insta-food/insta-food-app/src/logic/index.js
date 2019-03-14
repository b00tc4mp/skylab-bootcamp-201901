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

  retrieveUser(token) {
    return instaApi
      .retrieveUser(token)
      .then(({ id, name, username, email, favorites = [] }) => ({
        id,
        name,
        username,
        email,
        favorites
      }));
  },

  createPost(title, description, image) {
    if (typeof title !== "string") throw TypeError(`${title} is not a string`);
    if (!title.trim().length) throw Error("title is empty");
    if (typeof description !== "string")
      throw TypeError(`${description} is not a string`);
    if (!description.trim().length) throw Error("description is empty");
    if (typeof image !== "string") throw TypeError(`${image} is not a string`);
    if (!image.trim().length) throw Error("image is empty");
    return instaApi.createPost(
      title,
      description,
      image,
      this.__userId__,
      this.__userApiToken__
    );
  },

  retrieveAllPosts(token) {
    return instaApi.retrieveAllPosts(token);
  },
  retrievePostByUser(id, token) {
    return instaApi.retrievePostsByUser(id, token);
  },

  addComment(postId, id, text) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!text.trim().length) throw Error("text is empty");
    if (typeof text !== "string") throw TypeError(`${text} is not a string`);
    if (typeof id !== "string") throw TypeError(`${id} is not a string`);
    if (!id.trim().length) throw Error("id is empty");
    return instaApi.addComment(postId, this.__userApiToken__, id, text);
  },

  toggleFavorites(postId) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    return instaApi.toggleFavorites(this.__userApiToken__, postId);
  }
};

export default logic;
