require("dotenv").config();
const tokenHelper = require("../token-helper");

const {
  mongoose,
  models: { User, Comment, Post }
} = require("insta-food-data");
const expect = require("expect");
const logic = require(".");
const bcrypt = require("bcrypt");

const {
  env: { DB_URL_TEST }
} = process;

describe("logic", () => {
  before(() => mongoose.connect(DB_URL_TEST, { useNewUrlParser: true }));

  beforeEach(() =>
    Promise.all([Comment.deleteMany(), User.deleteMany(), Post.deleteMany()])
  );

  describe("register user", () => {
    const name = "hulio";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    const passwordConfirm = password;

    it("should succeed on valid data", async () => {
      const id = await logic.registerUser(
        name,
        username,
        email,
        password,
        passwordConfirm
      );
      const user = await User.findOne({ email });
      expect(user.name).toBe(name);
      expect(user.username).toBe(username);
      expect(user.email).toBe(email);
      const match = await bcrypt.compare(password, user.password);

      expect(match).toBeTruthy();
    });

    it("should fail on undefined name", () => {
      const name = undefined;
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(name + " is not a string"));
    });

    it("should fail on numeric name", () => {
      const name = 10;
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(name + " is not a string"));
    });

    it("should fail on boolean name", () => {
      const name = true;
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(name + " is not a string"));
    });

    it("should fail on object name", () => {
      const name = {};
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(name + " is not a string"));
    });

    it("should fail on array name", () => {
      const name = [];
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(name + " is not a string"));
    });

    it("should fail on empty name", () => {
      const name = "";
      const username = "123";
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(Error("name cannot be empty"));
    });

    it("should fail on undefined username", () => {
      const name = "hulio";
      const username = undefined;
      const email = `hulio123-${Math.random()}@mail.com`;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(username + " is not a string"));
    });

    it("should fail on numeric username", () => {
      const name = "hulio";
      const username = 10;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(username + " is not a string"));
    });

    it("should fail on boolean username", () => {
      const name = "hulio";
      const username = false;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(username + " is not a string"));
    });

    it("should fail on object username", () => {
      const name = "hulio";
      const username = {};
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(username + " is not a string"));
    });

    it("should fail on array username", () => {
      const name = "hulio";
      const username = [];
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(username + " is not a string"));
    });

    it("should fail on empty username", () => {
      const name = "hulio";
      const username = "";
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(Error("username cannot be empty"));
    });

    it("should fail on undefined email", () => {
      const name = "hulio";
      const username = "hulio";
      const email = undefined;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on numeric email", () => {
      const name = "hulio";
      const username = "hulio22";
      const email = 1;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on boolean email", () => {
      const name = "hulio";
      const username = "Hulio";
      const email = false;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on object email", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = {};
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on array mail", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = [];
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on empty mail", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerUser(name, username, email, password, password);
      }).toThrow(Error("email cannot be empty"));
    });

    it("should fail on undefined passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio";
      const email = "hulio@mail.com";
      const passwordConfirmation = undefined;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on numeric passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio22";
      const email = "hulio@mail.com";
      const passwordConfirmation = 1;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on boolean passwordConfirmation", () => {
      const name = "hulio";
      const username = "Hulio";
      const email = "hulio@mail.com";
      const passwordConfirmation = true;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on object passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const passwordConfirmation = {};

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on array passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const passwordConfirmation = [];

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on empty passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const passwordConfirmation = "";

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(Error("password confirmation cannot be empty"));
    });

    it("should fail on undefined passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio";
      const email = "hulio@mail.com";
      const passwordConfirmation = undefined;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on numeric passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio22";
      const email = "hulio@mail.com";
      const passwordConfirmation = 1;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on boolean passwordConfirmation", () => {
      const name = "hulio";
      const username = "Hulio";
      const email = "hulio@mail.com";
      const passwordConfirmation = true;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on object passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const passwordConfirmation = {};

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on array passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const password = [];
      const passwordConfirmation = password;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(TypeError(passwordConfirmation + " is not a string"));
    });

    it("should fail on empty passwordConfirmation", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const password = "";
      const passwordConfirmation = password;

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(Error("password cannot be empty"));
    });

    it("should fail password not match", () => {
      const name = "hulio";
      const username = "hulio2";
      const email = "hulio@mail.com";
      const password = "pepito";
      const passwordConfirmation = "2";

      expect(() => {
        logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirmation
        );
      }).toThrow(Error("passwords do not match"));
    });

    it("should fail on registering user with existing username", async () => {
      const name = "hulio";
      const username = "hulio123";
      const email = `hulio123-${Math.random()}@mail.com`;
      const password = `123-${Math.random()}`;
      const passwordConfirm = password;

      const id = await logic.registerUser(
        name,
        username,
        email,
        password,
        passwordConfirm
      );

      const email2 = `hulio-${Math.random()}@mail.com`;

      let errorCatched;

      try {
        let id2 = await logic.registerUser(
          name,
          username,
          email2,
          password,
          passwordConfirm
        );
      } catch (error) {
        errorCatched = error.message;
      }

      expect(errorCatched).toBe(
        "user with username " + username + " already exists"
      );
    });

    it("should fail on registering user with existing mail", async () => {
      const name = "hulio";
      const username = `hulio123-${Math.random()}@mail.com`;
      const email = "hulio123@mail.com";
      const password = `123-${Math.random()}`;
      const passwordConfirm = password;

      const id = await logic.registerUser(
        name,
        username,
        email,
        password,
        passwordConfirm
      );

      let errorCatched;

      try {
        let id2 = await logic.registerUser(
          name,
          username,
          email,
          password,
          passwordConfirm
        );
      } catch (error) {
        errorCatched = error.message;
      }

      expect(errorCatched).toBe("user with email " + email + " already exists");
    });
  });

  describe("authenticate user", () => {
    const name = "hulio";
    let username, email;
    const password = `123-${Math.random()}`;

    beforeEach(() => {
      username = "hulio123";
      email = "hulio123999@mail.com";
      return bcrypt.hash(password, 10).then(hash =>
        User.create({
          name,
          username,
          email,
          password: hash
        })
      );
    });

    it("should succeed on correct credentials when authenticate with email", () =>
      logic
        .authenticateUser(email, password)
        .then(id => expect(id).toBeDefined()));

    it("should fail on authenticate with incorrect email", async () => {
      let errorCatched;
      const email = "fake@email.com";

      try {
        const auth = await logic.authenticateUser(email, password);
      } catch (error) {
        errorCatched = error;
      }

      expect(errorCatched.message).toBe(`user with email ${email} not found`);
    });

    it("should fail on authenticate with incorrect password", async () => {
      let errorCatched;
      const password = "fakePassword69";

      try {
        const auth = await logic.authenticateUser(email, password);
      } catch (error) {
        errorCatched = error;
      }

      expect(errorCatched.message).toBe(`wrong credentials`);
    });

    it("should fail on undefined authenticate data", () => {
      const email = undefined;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on numeric authenticate data", () => {
      const email = 10;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on boolean authenticate data", () => {
      const email = false;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on object authenticate data", () => {
      const email = {};

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on array authenticate data", () => {
      const email = [];

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(email + " is not a string"));
    });

    it("should fail on empty password", () => {
      const password = "";

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(Error("password cannot be empty"));
    });

    it("should fail on undefined password", () => {
      const password = undefined;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(password + " is not a string"));
    });

    it("should fail on numeric password", () => {
      const password = 10;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(password + " is not a string"));
    });

    it("should fail on boolean password", () => {
      const password = false;

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(password + " is not a string"));
    });

    it("should fail on object password", () => {
      const password = {};

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(password + " is not a string"));
    });

    it("should fail on array password", () => {
      const password = [];

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(TypeError(password + " is not a string"));
    });
    it("should fail on empty email", () => {
      const email = "";

      expect(() => {
        logic.authenticateUser(email, password);
      }).toThrow(Error("email cannot be empty"));
    });
  });

  describe("retrieve user", () => {
    const name = "hulio";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    const passwordConfirm = password;

    let userId;

    beforeEach(() =>
      bcrypt.hash(password, 10).then(hash =>
        User.create({
          name,
          username,
          email,
          password: hash,
          passwordConfirm
        }).then(({ _id }) => (userId = _id.toString()))
      )
    );
    console.log(userId);

    it("should succeed on correct credentials", () =>
      logic.retrieveUser(userId).then(user => {
        expect(user._id.toString()).toBe(userId);
        expect(user.name).toBe(name);
        expect(user.username).toBe(username);
        expect(user.email).toBe(email);
      }));

    it("should fail on incorrect userId", async () => {
      let errorCatched;
      const userId = "5c7d5fdbba3aed8dc820ece0";

      try {
        const auth = await logic.retrieveUser(userId);
      } catch (error) {
        errorCatched = error;
      }

      expect(errorCatched.message).toBe(`user with id ${userId} not found`);
    });

    it("should fail on empty userId", () => {
      const userId = "";

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined userId", () => {
      const userId = undefined;

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(TypeError(userId + " is not a string"));
    });

    it("should fail on numeric userId", () => {
      const userId = 10;

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(TypeError(userId + " is not a string"));
    });

    it("should fail on boolean userId", () => {
      const userId = false;

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(TypeError(userId + " is not a string"));
    });

    it("should fail on object userId", () => {
      const userId = {};

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(TypeError(userId + " is not a string"));
    });

    it("should fail on array userId", () => {
      const userId = [];

      expect(() => {
        logic.retrieveUser(userId);
      }).toThrow(TypeError(userId + " is not a string"));
    });
  });

  describe("Create Post", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let token;
    beforeEach(() =>
      User.create({ name, username, email, password }).then(user => {
        debugger;
        user_id = user._id.toString();
      })
    );
    it("should succeed on valid data", async () => {
      const postCreate = await logic.createPost(
        title,
        description,
        image,
        user_id
      );

      const post = await Post.findOne(postCreate._id);
      expect(post.title).toBe(title);
      expect(post.description).toBe(description);
      expect(post.image).toBe(image);
    });
    it("should fail on undefined title", () => {
      expect(() => {
        logic.createPost();
      }).toThrow(TypeError("undefined is not a string"));
    });

    it("should fail on array title", () => {
      expect(() => {
        logic.createPost([]);
      }).toThrow(TypeError([] + " is not a string"));
    });
    it("should fail on boolean title", () => {
      const title = true;
      const description = "ijij";
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(title + " is not a string"));
    });

    it("should fail on numeric title", () => {
      const title = 1;
      const description = "ijij";
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(title + " is not a string"));
    });

    it("should fail on object title", () => {
      const title = {};
      const description = "ijij";
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(title + " is not a string"));
    });

    it("should fail on empty title", () => {
      const title = "";
      const description = "ijij";
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(title + "title cannot be empty"));
    });

    it("should fail on undefined description", () => {
      const title = "jojoj";
      const description = undefined;
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(description + " is not a string"));
    });

    it("should fail on array description", () => {
      const title = "jojoj";
      const description = [];
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(description + " is not a string"));
    });
    it("should fail on boolean description", () => {
      const title = "jojoj";
      const description = true;
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(description + " is not a string"));
    });

    it("should fail on numeric descritpion", () => {
      const title = "jojoj";
      const description = 1;
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image), user_id;
      }).toThrow(TypeError(description + " is not a string"));
    });

    it("should fail on object description", () => {
      const title = "jojoj";
      const description = {};
      const image = "http://image";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(description + " is not a string"));
    });

    it("should fail on empty description", () => {
      const title = "jojoj";
      const description = "";
      const image = "http://google.es";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(description + "description cannot be empty"));
    });

    it("should fail on undefined description", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = undefined;

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + " is not a string"));
    });

    it("should fail on array description", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = [];

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + " is not a string"));
    });
    it("should fail on boolean description", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = true;

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + " is not a string"));
    });

    it("should fail on numeric descritpion", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = 1;

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + " is not a string"));
    });

    it("should fail on object image", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = {};

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + " is not a string"));
    });

    it("should fail on empty image", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(image + "image cannot be empty"));
    });

    it("should fail on empty user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "htt://image.es";
      user_id = "";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(user_id + " user_id cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "htt://image.es";
      user_id = undefined;

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "htt://image.es";
      user_id = [];

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "http://image.es";
      user_id = true;

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "http://image.es";
      user_id = {};

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on empty user_id", () => {
      const title = "jojoj";
      const description = "lololo";
      const image = "http://image.es";
      user_id = "";

      expect(() => {
        logic.createPost(title, description, image, user_id);
      }).toThrow(Error(" user_id cannot be empty"));
    });
  });
  describe("Retrieve post by user", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const tags = ["#rico"];
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let postId;
    beforeEach(() =>
      User.create({ name, username, email, password })
        .then(user => {
          user_id = user._id.toString();
        })
        .then(() =>
          Post.create({
            tags,
            title,
            description,
            image,
            user_id
          })
        )
        .then(post => {
          postId = post._id.toString();
        })
    );
    it("should succeed on valid data", async () => {
      const retrievePost = await logic.retrievePostsByUser(user_id);
      expect(retrievePost.post[0].title).toBe(title);
      expect(retrievePost.post[0].description).toBe(description);
      expect(retrievePost.post[0].image).toBe(image);
      expect(retrievePost.post[0].image).toBe(image);
    });

    it("should fail on object user_id", () => {
      user_id = {};
      expect(() => {
        logic.retrievePostsByUser(user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on empty user_id", () => {
      user_id = "";

      expect(() => {
        logic.retrievePostsByUser(user_id);
      }).toThrow(TypeError(user_id + "userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.retrievePostsByUser(user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.retrievePostsByUser(user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.retrievePostsByUser(user_id);
      }).toThrow(TypeError(user_id + " is not a string"));
    });
  });

  describe("Retrieve all posts", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const tags = ["#rico"];
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let postId;
    beforeEach(() =>
      User.create({ name, username, email, password })
        .then(user => {
          user_id = user._id.toString();
        })
        .then(() =>
          Post.create({
            tags,
            title,
            description,
            image,
            user_id
          })
        )
        .then(post => {
          postId = post._id.toString();
        })
    );
    it("should succeed on valid data", async () => {
      const retrievePost = await logic.retrieveAllPosts();
      expect(retrievePost[0].title).toBe(title);
      expect(retrievePost[0].description).toBe(description);
      expect(retrievePost[0].image).toBe(image);
      expect(retrievePost[0].user_id._id.toString()).toBe(user_id);
    });
  });

  describe("Favorites", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const tags = ["#rico"];
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let postId;
    beforeEach(() =>
      User.create({ name, username, email, password })
        .then(user => {
          user_id = user._id.toString();
        })
        .then(() =>
          Post.create({
            tags,
            title,
            description,
            image,
            user_id
          })
        )
        .then(post => {
          postId = post._id.toString();
        })
    );
    it("should succeed on valid data", async () => {
      const Favorites = await logic.toggleFavoritesUser(user_id, postId);
      expect(Favorites.favorites[0].title).toBe(title);
      expect(Favorites.favorites[0].description).toBe(description);
      expect(Favorites.favorites[0].image).toBe(image);
    });
    it("should fail on empty postId", () => {
      user_id = "";
      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });
    it("should fail on empty user_id", () => {
      user_id = "";
      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });
    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.toggleFavoritesUser(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });
  });

  describe("addCommentPost", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const tags = ["#rico"];
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let text = "hola este es mi comentatio eta toh wapoh premoh";
    let postId;
    beforeEach(() =>
      User.create({ name, username, email, password })
        .then(user => {
          user_id = user._id.toString();
        })
        .then(() =>
          Post.create({
            tags,
            title,
            description,
            image,
            user_id
          })
        )
        .then(post => {
          postId = post._id.toString();
        })
    );
    it("should succeed on valid data", async () => {
      const Comments = await logic.addCommentPost(user_id, postId, text);
      console.log(Comments);
      expect(Comments.comments[0]._id).toBeDefined();
      expect(Comments.comments[0].body).toBe(text);
    });
    it("should fail on empty postId", () => {
      user_id = "";
      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });
    it("should fail on empty user_id", () => {
      user_id = "";
      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });
    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on empty text", () => {
      text = "";
      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(Error("text cannot be empty"));
    });

    it("should fail on undefined text", () => {
      text = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on array text", () => {
      text = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on boolean text", () => {
      text = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on object text", () => {
      text = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });
    it("should fail on empty text", () => {
      text = "";
      expect(() => {
        logic.addCommentPost(text, postId, text);
      }).toThrow(Error("text cannot be empty"));
    });

    it("should fail on undefined text", () => {
      text = undefined;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on array text", () => {
      text = [];

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on boolean text", () => {
      text = true;

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });

    it("should fail on object text", () => {
      text = {};

      expect(() => {
        logic.addCommentPost(user_id, postId, text);
      }).toThrow(TypeError(text + " is not a string"));
    });
  });
  describe("delete", () => {
    const title = "hguguh";
    const description = "ijij";
    const image = "http://image";
    const tags = ["#rico"];
    let user_id;
    const name = "hulio222222";
    const username = `hulio123-${Math.random()}@mail.com`;
    const email = `hulio123-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    let text = "hola este es mi comentatio eta toh wapoh premoh";
    let postId;
    beforeEach(() =>
      User.create({ name, username, email, password })
        .then(user => {
          user_id = user._id.toString();
        })
        .then(() =>
          Post.create({
            tags,
            title,
            description,
            image,
            user_id
          })
        )
        .then(post => {
          postId = post._id.toString();
        })
    );
    it("should succeed on valid data", async () => {
      const Delete = await logic.deletePost(user_id, postId);
      expect(Delete.message).toBe("ok");
    });
    it("should fail on empty postId", () => {
      user_id = "";
      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });
    it("should fail on empty user_id", () => {
      user_id = "";
      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(Error("userId cannot be empty"));
    });

    it("should fail on undefined user_id", () => {
      user_id = undefined;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on array user_id", () => {
      user_id = [];

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on boolean user_id", () => {
      user_id = true;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on object user_id", () => {
      user_id = {};

      expect(() => {
        logic.deletePost(user_id, postId, text);
      }).toThrow(TypeError(user_id + " is not a string"));
    });

    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });
    it("should fail on empty postId", () => {
      postId = "";
      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(Error("postId cannot be empty"));
    });

    it("should fail on undefined postId", () => {
      postId = undefined;

      expect(() => {
        logic.deletePost(user_id, postId;
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on array postId", () => {
      postId = [];

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on boolean postId", () => {
      postId = true;

      expect(() => {
        logic.deletePost(user_id, postId);
      }).toThrow(TypeError(postId + " is not a string"));
    });

    it("should fail on object postId", () => {
      postId = {};

      expect(() => {
        logic.deletePost(user_id, postId;
      }).toThrow(TypeError(postId + " is not a string"));
    });
  });

  after(() =>
    Promise.all([
      Comment.deleteMany(),
      User.deleteMany(),
      Post.deleteMany()
    ]).then(() => mongoose.disconnect())
  );
});
