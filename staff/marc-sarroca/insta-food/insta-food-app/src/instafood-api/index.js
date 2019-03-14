const instaApi = {
  url: "http://localhost:8000/api",

  registerUser(name, username, email, password, passwordConfirm) {
    if (typeof name !== "string") throw TypeError(`${name} is not a string`);
    if (!name.trim().length) throw Error("name is empty");
    if (typeof username !== "string")
      throw TypeError(`${username} is not a string`);
    if (!username.trim().length) throw Error("username is empty");
    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");
    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");
    if (typeof passwordConfirm !== "string")
      throw TypeError(`${passwordConfirm} is not a string`);
    if (!passwordConfirm.trim().length)
      throw Error("password confirm is empty");

    return fetch(`${this.url}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, username, email, password, passwordConfirm })
    })
      .then(response => response.json())
      .then(({ id, error }) => {
        if (error) throw Error(error);

        return id;
      });
  },

  authenticateUser(email, password) {
    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");
    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");
    return fetch(`${this.url}/user/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) throw Error(response.error);

        return response;
      });
  },

  retrieveUser(token) {
    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");

    return fetch(`${this.url}/user`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) throw Error(response.error);

        return response;
      });
  },

  createPost(title, description, image, userId, token) {
    if (typeof title !== "string") throw TypeError(`${title} is not a string`);
    if (!title.trim().length) throw Error("title is empty");
    if (typeof description !== "string")
      throw TypeError(`${description} is not a string`);
    if (!description.trim().length) throw Error("description is empty");
    if (typeof image !== "string") throw TypeError(`${image} is not a string`);
    if (!image.trim().length) throw Error("image is empty");
    if (typeof userId !== "string")
      throw TypeError(`${userId} is not a string`);
    if (!userId.trim().length) throw Error("userId is empty");
    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");

    return fetch(`${this.url}/user/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        image,
        userId
      })
    })
      .then(response => response.json())
      .then(post => post);
  },

  retrieveAllPosts(token) {
    return fetch(`${this.url}/posts`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
  },

  retrievePostsByUser(id, token) {
    if (typeof id !== "string") throw TypeError(`${id} is not a string`);
    if (!id.trim().length) throw Error("id is empty");
    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");
    return fetch(`${this.url}/user/${id}/posts`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(post => post);
  },

  addComment(postId, token, userId, text) {
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");
    if (typeof text !== "string") throw TypeError(`${text} is not a string`);
    if (!text.trim().length) throw Error("text is empty");
    if (typeof userId !== "string")
      throw TypeError(`${userId} is not a string`);
    if (!userId.trim().length) throw Error("userId is empty");
    return fetch(`${this.url}/user/${postId}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        userId,
        text
      })
    })
      .then(response => response.json())
      .then(post => post);
  },

  toggleFavorites(token, postId) {
    if (typeof token !== "string") throw TypeError(`${token} is not a string`);
    if (!token.trim().length) throw Error("token is empty");
    if (typeof postId !== "string")
      throw TypeError(`${postId} is not a string`);
    if (!postId.trim().length) throw Error("postId is empty");
    return fetch(`${this.url}/user/favorites/${postId}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(post => post);
  }
};

export default instaApi;
