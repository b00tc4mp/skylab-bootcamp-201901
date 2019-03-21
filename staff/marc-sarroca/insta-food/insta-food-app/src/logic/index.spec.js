import logic from ".";
import UserContext from "../userContext";
const { login, user } = UserContext;

describe("logic", () => {
  describe("register user", () => {
    const name = "Marc  ";
    const username = `hulio-${Math.random()}`;
    const email = `hulio-${Math.random()}@mail.com`;
    const password = `password-${Math.random()}`;

    it("should succeed on correct data", () =>
      logic
        .registerUser(name, username, email, password, password)
        .then(id => expect(id).toBeDefined()));

    it("should fail on already existing user", () =>
      logic
        .registerUser(name, username, email, password, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`user with email ${email} already exists`);
        }));

    // it("should fail on non-matching password and its confirmation", () =>
    //   logic
    //     .registerUser(
    //       name,
    //       username,
    //       email,
    //       password,
    //       `non-matching ${password}`
    //     )
    //     .then(() => {
    //       throw Error("should not have passed by here");
    //     })
    //     .catch(error => {
    //       expect(error).toBeDefined();
    //     }));
  });

  //   describe("authenticate user", () => {
  //     const name = "Marc  ";
  //     const username = `hulio-${Math.random()}`;
  //     const email = `hulio-${Math.random()}@mail.com`;
  //     const password = `password-${Math.random()}`;

  //     beforeEach(() =>
  //       logic.registerUser(name, username, email, password, password)
  //     );

  //     it("should succeed on correct data", () =>
  //       logic
  //         .authenticateUser(email, password)
  //         .then(token => expect(token).toBeDefined()));
  //   });

  //   describe("retrieve user", () => {
  //     const name = "Marc  ";
  //     const username = `hulio-${Math.random()}`;
  //     const email = `hulio-${Math.random()}@mail.com`;
  //     const password = `password-${Math.random()}`;

  //     let _token;

  //     beforeEach(() =>
  //       logic
  //         .registerUser(name, username, email, password, password)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(({ token }) => {
  //           _token = token;
  //         })
  //     );

  //     it("should succeed on correct data", () =>
  //       logic.retrieveUser(_token).then(user => {
  //         expect(user.name).toBe(name);
  //         expect(user.username).toBe(username);
  //         expect(user.email).toBe(email);
  //       }));
  //   });

  //   describe("Create Post", () => {
  //     const title = "hguguh";
  //     const description = "ijij";
  //     const image = "http://image";
  //     let userId;
  //     const name = "hulio222222";
  //     let username;
  //     let email;
  //     const password = "1234s";
  //     const passwordConfirm = password;
  //     let token;
  //     beforeEach(() => {
  //       username = `mamabicho123-${Math.random()}@mail.com`;
  //       email = `mamabicho123-${Math.random()}@mail.com`;
  //       return logic
  //         .registerUser(name, username, email, password, passwordConfirm)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(res => {
  //           token = res.token;
  //           userId = res.id;
  //         });
  //     });
  //     it("should succeed on valid data", async () => {
  //       const postCreate = await logic.createPost(
  //         title,
  //         description,
  //         image,
  //         userId,
  //         token
  //       );
  //       expect(postCreate.post.title).toBe(title);
  //       expect(postCreate.post.description).toBe(description);
  //       expect(postCreate.post.image).toBe(image);
  //     });

  //     it("should fail on undefined title", () => {
  //       expect(() => {
  //         logic.createPost();
  //       }).toThrow(TypeError("undefined is not a string"));
  //     });

  //     it("should fail on array title", () => {
  //       expect(() => {
  //         logic.createPost([]);
  //       }).toThrow(TypeError([] + " is not a string"));
  //     });
  //     it("should fail on boolean title", () => {
  //       const title = true;
  //       const description = "ijij";
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(title + " is not a string"));
  //     });

  //     it("should fail on numeric title", () => {
  //       const title = 1;
  //       const description = "ijij";
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(title + " is not a string"));
  //     });

  //     it("should fail on object title", () => {
  //       const title = {};
  //       const description = "ijij";
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(title + " is not a string"));
  //     });

  //     it("should fail on empty title", () => {
  //       const title = "";
  //       const description = "ijij";
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(title + "title cannot be empty"));
  //     });

  //     it("should fail on undefined description", () => {
  //       const title = "jojoj";
  //       const description = undefined;
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + " is not a string"));
  //     });

  //     it("should fail on array description", () => {
  //       const title = "jojoj";
  //       const description = [];
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + " is not a string"));
  //     });
  //     it("should fail on boolean description", () => {
  //       const title = "jojoj";
  //       const description = true;
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + " is not a string"));
  //     });

  //     it("should fail on numeric descritpion", () => {
  //       const title = "jojoj";
  //       const description = 1;
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + " is not a string"));
  //     });

  //     it("should fail on object description", () => {
  //       const title = "jojoj";
  //       const description = {};
  //       const image = "http://image";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + " is not a string"));
  //     });

  //     it("should fail on empty description", () => {
  //       const title = "jojoj";
  //       const description = "";
  //       const image = "http://google.es";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(description + "description cannot be empty"));
  //     });

  //     it("should fail on undefined description", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = undefined;

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(image + " is not a string"));
  //     });

  //     it("should fail on array description", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = [];

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(image + " is not a string"));
  //     });
  //     it("should fail on boolean description", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = true;

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(image + " is not a string"));
  //     });

  //     it("should fail on numeric descritpion", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = 1;

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(image + " is not a string"));
  //     });

  //     it("should fail on object image", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = {};

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(image + " is not a string"));
  //     });

  //     it("should fail on empty image", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(Error("image cannot be empty"));
  //     });

  //     it("should fail on empy userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "htt://image.es";
  //       userId = "";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(Error("userId cannot be empty"));
  //     });

  //     it("should fail on undefind userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "htt://image.es";
  //       userId = undefined;

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(userId + " is not a string"));
  //     });

  //     it("should fail on arry userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "htt://image.es";
  //       userId = [];

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(userId + " is not a string"));
  //     });

  //     it("should fail on boolen userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "http://image.es";
  //       userId = true;

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(userId + " is not a string"));
  //     });

  //     it("should fail on objet userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "http://image.es";
  //       userId = {};

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(TypeError(userId + " is not a string"));
  //     });

  //     it("should fail on empy userId", () => {
  //       const title = "jojoj";
  //       const description = "lololo";
  //       const image = "http://image.es";
  //       userId = "";

  //       expect(() => {
  //         logic.createPost(title, description, image, userId);
  //       }).toThrow(Error("userId cannot be empty"));
  //     });
  //   });

  describe("Retrieve post by user", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const name = "hulio222222";
    let username;
    let email;
    let token;
    let userId;
    const password = `123-${Math.random()}`;
    const passwordConfirm = password;
    beforeEach(() => {
      username = `mamabicho123-${Math.random()}@mail.com`;
      email = `mamabicho123-${Math.random()}@mail.com`;
      return logic
        .registerUser(name, username, email, password, passwordConfirm)
        .then(() => login(email, password))
        .then(res => {
          token = res.token;
          userId = res.id;
        })
        .then(() => logic.createPost(title, description, image, userId, token));
    });
    it("should succeed on valid data", async () => {
      const retrievePost = await logic.retrievePostsByUser(userId, token);
      expect(retrievePost.post[0].title).toBe(title);
      expect(retrievePost.post[0].description).toBe(description);
      expect(retrievePost.post[0].image).toBe(image);
      expect(retrievePost.post[0].image).toBe(image);
      expect(retrievePost.user._id.toString()).toBe(userId);
    });

    // it("should fail on object userId", () => {
    //   userId = {};
    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(userId + " is not a string"));
    // });

    // it("should fail on empty userId", () => {
    //   userId = "";

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(userId + "id cannot be empty"));
    // });

    // it("should fail on undefined userId", () => {
    //   userId = undefined;

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(userId + " is not a string"));
    // });

    // it("should fail on array userId", () => {
    //   userId = [];

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(userId + " is not a string"));
    // });

    // it("should fail on boolean userId", () => {
    //   userId = true;

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(userId + " is not a string"));
    // });
    // it("should fail on object token", () => {
    //   token = {};
    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(token + " is not a string"));
    // });

    // it("should fail on empty token", () => {
    //   token = "";

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(Error("token cannot be empty"));
    // });

    // it("should fail on undefined token", () => {
    //   token = undefined;

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(token + " is not a string"));
    // });

    // it("should fail on array token", () => {
    //   token = [];

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(token + " is not a string"));
    // });

    // it("should fail on boolean token", () => {
    //   token = true;

    //   expect(() => {
    //     logic.retrievePostsByUser(userId, token);
    //   }).toThrow(TypeError(token + " is not a string"));
    // });
  });
  //   describe("Retrieve all posts", () => {
  //     const title = "hguguh";
  //     const description = "ijij";
  //     const image = "http://image";
  //     const name = "hulio222222";
  //     let username;
  //     let email;
  //     let token;
  //     let userId;
  //     const password = `123-${Math.random()}`;
  //     const passwordConfirm = password;
  //     beforeEach(() => {
  //       username = `mamabicho123-${Math.random()}@mail.com`;
  //       email = `mamabicho123-${Math.random()}@mail.com`;
  //       return logic
  //         .registerUser(name, username, email, password, passwordConfirm)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(res => {
  //           token = res.token;
  //           userId = res.id;
  //         })
  //         .then(() => logic.createPost(title, description, image, userId, token));
  //     });

  //     it("should succeed on valid data", async () => {
  //       const retrievePost = await logic.retrieveAllPosts(token);
  //       expect(retrievePost[0].title).toBe(title);
  //       expect(retrievePost[0].description).toBe(description);
  //       expect(retrievePost[0].image).toBe(image);
  //     });
  //     it("should fail on object token", () => {
  //       token = {};
  //       expect(() => {
  //         logic.retrievePostsByUser(userId, token);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on empty token", () => {
  //       token = "";

  //       expect(() => {
  //         logic.retrievePostsByUser(userId, token);
  //       }).toThrow(Error("token cannot be empty"));
  //     });

  //     it("should fail on undefined token", () => {
  //       token = undefined;

  //       expect(() => {
  //         logic.retrievePostsByUser(userId, token);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on array token", () => {
  //       token = [];

  //       expect(() => {
  //         logic.retrievePostsByUser(userId, token);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on boolean token", () => {
  //       token = true;

  //       expect(() => {
  //         logic.retrievePostsByUser(userId, token);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });
  //   });

  //   describe("Favorites", () => {
  //     const title = "hguguh";
  //     const description = "ijij";
  //     const image = "http://image";
  //     const name = "hulio222222";
  //     let username;
  //     let email;
  //     let token;
  //     let user_id;
  //     const password = `123-${Math.random()}`;
  //     const passwordConfirm = password;
  //     let postId;
  //     beforeEach(() => {
  //       username = `mamabicho123-${Math.random()}@mail.com`;
  //       email = `mamabicho123-${Math.random()}@mail.com`;
  //       return logic
  //         .registerUser(name, username, email, password, passwordConfirm)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(res => {
  //           token = res.token;
  //           user_id = res.id;
  //         })
  //         .then(() => logic.createPost(title, description, image, user_id, token))
  //         .then(post => {
  //           postId = post.post._id;
  //         });
  //     });
  //     it("should succeed on valid data", async () => {
  //       const Favorites = await logic.toggleFavorites(token, postId);
  //       expect(Favorites.favorites[0].title).toBe(title);
  //       expect(Favorites.favorites[0].description).toBe(description);
  //       expect(Favorites.favorites[0].image).toBe(image);
  //     });
  //     it("should fail on object token", () => {
  //       token = {};
  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on empty token", () => {
  //       token = "";

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(Error("token cannot be empty"));
  //     });

  //     it("should fail on undefined token", () => {
  //       token = undefined;

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on array token", () => {
  //       token = [];

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on boolean token", () => {
  //       token = true;

  //       expect(() => {
  //         logic.retrievePostsByUser(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });
  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.toggleFavorites(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });
  //   });

  //   describe("addComment", () => {
  //     const title = "hguguh";
  //     const description = "ijij";
  //     const image = "http://image";
  //     const name = "hulio222222";
  //     let username;
  //     let email;
  //     let token;
  //     let user_id;
  //     const password = `123-${Math.random()}`;
  //     const passwordConfirm = password;
  //     let postId;
  //     let text = "hola k ases";
  //     beforeEach(() => {
  //       username = `mamabicho123-${Math.random()}@mail.com`;
  //       email = `mamabicho123-${Math.random()}@mail.com`;
  //       return logic
  //         .registerUser(name, username, email, password, passwordConfirm)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(res => {
  //           token = res.token;
  //           user_id = res.id;
  //         })
  //         .then(() => logic.createPost(title, description, image, user_id, token))
  //         .then(post => {
  //           postId = post.post._id;
  //         });
  //     });
  //     it("should succeed on valid data", async () => {
  //       const Comments = await logic.addComment(postId, token, user_id, text);
  //       expect(Comments.comments[0]._id).toBeDefined();
  //       expect(Comments.comments[0].body).toBe(text);
  //     });
  //     it("should fail on empty postId", () => {
  //       user_id = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("userId cannot be empty"));
  //     });

  //     it("should fail on undefined user_id", () => {
  //       user_id = undefined;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on array user_id", () => {
  //       user_id = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on boolean user_id", () => {
  //       user_id = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on object user_id", () => {
  //       user_id = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });
  //     it("should fail on empty user_id", () => {
  //       user_id = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("userId cannot be empty"));
  //     });

  //     it("should fail on undefined user_id", () => {
  //       user_id = undefined;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on array user_id", () => {
  //       user_id = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on boolean user_id", () => {
  //       user_id = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on object user_id", () => {
  //       user_id = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(user_id + " is not a string"));
  //     });

  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });
  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on empty text", () => {
  //       text = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("text cannot be empty"));
  //     });

  //     it("should fail on undefined text", () => {
  //       text = undefined;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on array text", () => {
  //       text = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on boolean text", () => {
  //       text = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on object text", () => {
  //       text = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });
  //     it("should fail on empty text", () => {
  //       text = "";
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(Error("text cannot be empty"));
  //     });

  //     it("should fail on undefined text", () => {
  //       text = undefined;
  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on array text", () => {
  //       text = [];

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on boolean text", () => {
  //       text = true;

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });

  //     it("should fail on object text", () => {
  //       text = {};

  //       expect(() => {
  //         logic.addComment(postId, token, user_id, text);
  //       }).toThrow(TypeError(text + " is not a string"));
  //     });
  //   });

  //   describe("delete", () => {
  //     const title = "hguguh";
  //     const description = "ijij";
  //     const image = "http://image";
  //     const name = "hulio222222";
  //     let username;
  //     let email;
  //     let token;
  //     let user_id;
  //     const password = `123-${Math.random()}`;
  //     const passwordConfirm = password;
  //     let postId;
  //     let text = "hola k ases";
  //     beforeEach(() => {
  //       username = `mamabicho123-${Math.random()}@mail.com`;
  //       email = `mamabicho123-${Math.random()}@mail.com`;
  //       return logic
  //         .registerUser(name, username, email, password, passwordConfirm)
  //         .then(() => logic.authenticateUser(email, password))
  //         .then(res => {
  //           token = res.token;
  //           user_id = res.id;
  //         })
  //         .then(() => logic.createPost(title, description, image, user_id, token))
  //         .then(post => {
  //           postId = post.post._id;
  //         });
  //     });
  //     it("should succeed on valid data", async () => {
  //       const Delete = await logic.removePost(token, postId);
  //       expect(Delete.message).toBe("ok");
  //     });
  //     it("should fail on object token", () => {
  //       token = {};
  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on empty token", () => {
  //       token = "";

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(Error("token cannot be empty"));
  //     });

  //     it("should fail on undefined token", () => {
  //       token = undefined;

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on array token", () => {
  //       token = [];

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on boolean token", () => {
  //       token = true;

  //       expect(() => {
  //         logic.retrievePostsByUser(token, postId);
  //       }).toThrow(TypeError(token + " is not a string"));
  //     });

  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });
  //     it("should fail on empty postId", () => {
  //       postId = "";
  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(Error("postId cannot be empty"));
  //     });

  //     it("should fail on undefined postId", () => {
  //       postId = undefined;

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on array postId", () => {
  //       postId = [];

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on boolean postId", () => {
  //       postId = true;

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });

  //     it("should fail on object postId", () => {
  //       postId = {};

  //       expect(() => {
  //         logic.removePost(token, postId);
  //       }).toThrow(TypeError(postId + " is not a string"));
  //     });
  //   });
});
