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
      .then(id => id);
  },

  retrieveUser() {
    return instaApi
      .retrieveUser(this.__userApiToken__)
      .then(({ id, name, username, email, favorites = [] }) => ({
        id,
        name,
        username,
        email,
        favorites
      }));
  },

  createPost(title, description, image) {
    if (typeof title !== "string") throw Error("Title is not a string");
    if (!title.trim().length) throw Error("title is empty");
    if (typeof description !== "string")
      throw Error("Description can't be empty");
    if (!description.trim().length) throw Error("description is empty");
    if (typeof image !== "string") throw Error("Image can't be is upload");
    if (!image.trim().length) throw Error("image is empty");
    return instaApi.createPost(
      title,
      description,
      image,
      this.__userId__,
      this.__userApiToken__
    );
  },

  retrieveAllPosts(page) {
    return instaApi.retrieveAllPosts(this.__userApiToken__, page);
  },
  retrievePostByUser(postUserId) {
    if (typeof postUserId !== "string")
      throw TypeError(`${postUserId} is not a string`);
    if (!postUserId.trim().length) throw Error("postUserId is empty");
    return instaApi.retrievePostsByUser(postUserId, this.__userApiToken__);
  },

  addComment(postId, text) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    if (!text.trim().length) throw Error("text is empty");
    if (typeof text !== "string") throw TypeError(`${text} is not a string`);
    return instaApi.addComment(
      postId,
      this.__userApiToken__,
      this.__userId__,
      text
    );
  },

  toggleFavorites(postId) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    return instaApi.toggleFavorites(this.__userApiToken__, postId);
  },
  removePost(postId) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    return instaApi.removePost(this.__userApiToken__, postId);
  }
};

export default logic;
