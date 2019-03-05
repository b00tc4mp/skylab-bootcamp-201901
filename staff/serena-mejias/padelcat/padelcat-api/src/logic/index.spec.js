"use strict";

require("dotenv").config();

require("isomorphic-fetch");

const mongoose = require("mongoose");
const { Player, Match, Team } = require("../models");
const expect = require("expect");
const logic = require(".");
const bcrypt = require("bcrypt");

const {
  env: { TEST_DB_URL }
} = process;

describe("logic", () => {
  before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }));

  beforeEach(() =>
    Promise.all([Player.deleteMany(), Match.deleteMany(), Team.deleteMany()])
  );

  describe("register player", () => {
    const name = "Manuel";
    const surname = "Barzi";
    const email = `manuelbarzi-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
    const preferedPosition = "left";

    it("should succeed on valid data", async () => {
      const id = await logic.registerPlayer(
        name,
        surname,
        email,
        password,
        link,
        preferedPosition
      );

      expect(id).toBeDefined();
      expect(typeof id).toBe("string");

      const player = await Player.findOne({ email });

      expect(player.name).toBe(name);
      expect(player.surname).toBe(surname);
      expect(player.email).toBe(email);

      const match = await bcrypt.compare(password, player.password);

      expect(match).toBeTruthy();
    });

    it("should fail on undefined name", () => {
      const name = undefined;
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on numeric name", () => {
      const name = 10;
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on boolean name", () => {
      const name = true;
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on object name", () => {
      const name = {};
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on array name", () => {
      const name = [];
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on empty name", () => {
      const name = "";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(Error("name cannot be empty"));
    });

    it("should fail on undefined surname", () => {
      const name = "Manuel";
      const surname = undefined;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on numeric surname", () => {
      const name = "Manuel";
      const surname = 10;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on boolean surname", () => {
      const name = "Manuel";
      const surname = false;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on object surname", () => {
      const name = "Manuel";
      const surname = {};
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on array surname", () => {
      const name = "Manuel";
      const surname = [];
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on empty surname", () => {
      const name = "Manuel";
      const surname = "";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(Error("surname cannot be empty"));
    });

    it("should fail on undefined email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = undefined;
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on numeric email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = 10;
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on boolean email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = false;
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on object email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = {};
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on array email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = [];
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on empty email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "";
      const password = `123-${Math.random()}`;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(Error("email cannot be empty"));
    });

    it("should fail on undefined password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = undefined;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on numeric password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = 10;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on boolean password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = false;
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on object password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = {};
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on array password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = [];
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on empty password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = "";
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const preferedPosition = "left";

      expect(() => {
        logic.registerPlayer(
          name,
          surname,
          email,
          password,
          link,
          preferedPosition
        );
      }).toThrow(Error("password cannot be empty"));
    });
  });

  describe("authenticate player", () => {
    const name = "Manuel";
    const surname = "Barzi";
    const email = `manuelbarzi-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
    const preferedPosition = "left";

    beforeEach(() =>
      bcrypt.hash(password, 10).then(hash =>
        Player.create({
          name,
          surname,
          email,
          password: hash,
          link,
          preferedPosition
        })
      )
    );

    it("should succeed on correct credentials", () =>
      logic
        .authenticatePlayer(email, password)
        .then(id => expect(id).toBeDefined()));

    it("should fail on undefined email", () => {
      const email = undefined;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on numeric email", () => {
      const email = 10;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on boolean email", () => {
      const email = false;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on object email", () => {
      const email = {};
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on array email", () => {
      const email = [];
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on empty email", () => {
      const email = "";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(Error("email cannot be empty"));
    });

    it("should fail on undefined password", () => {
      const email = "manuelbarzi@mail.com";
      const password = undefined;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on numeric password", () => {
      const email = "manuelbarzi@mail.com";
      const password = 10;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on boolean password", () => {
      const email = "manuelbarzi@mail.com";
      const password = false;

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on object password", () => {
      const email = "manuelbarzi@mail.com";
      const password = {};

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on array password", () => {
      const email = "manuelbarzi@mail.com";
      const password = [];

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on empty password", () => {
      const email = "manuelbarzi@mail.com";
      const password = "";

      expect(() => {
        logic.authenticatePlayer(email, password);
      }).toThrow(Error("password cannot be empty"));
    });
  });

  describe("retrieveScoreData", () => {
    it("should succeed with correct data", () => {
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      expect(logic.retrieveScoreData(link)).toBeTruthy();
    });

    it("should succeed with correct link", () => {
      const data = {
        link: "https://www.setteo.com/usuario/serena-mejias-vazquez",
        imageUrl:
          "https://www.setteo.com/media/resize/30/30/1/media/defaults/d/e/fa/mujer.png",
        score: "60"
      };
      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      expect(logic.retrieveScoreData(link)).toEqual(data.score);
    });

    it("should fail on undefined link", () => {
      const link = undefined;

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error(link + " is not string"));
    });

    it("should fail on number link", () => {
      const link = 10;

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error(link + " is not string"));
    });

    it("should fail on array link", () => {
      const link = [];

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error(link + " is not string"));
    });

    it("should fail on object link", () => {
      const link = {};

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error(link + " is not string"));
    });

    it("should fail on boolean link", () => {
      const link = false;

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error(link + " is not string"));
    });

    it("should fail on empty link", () => {
      const link = "";

      expect(() => {
        logic.retrieveScoreData(link);
      }).toThrow(Error("link cannot be empty"));
    });
  });

  describe("addScoreToPlayer", () => {
    const name = "Manuel";
    const surname = "Barzi";
    const email = `manuelbarzi-${Math.random()}@mail.com`;
    const password = `123-${Math.random()}`;
    const link = "https:www.setteo.com/usuario/serena-mejias-vazquez";
    const preferedPosition = "left";
    let score;
    let playerId;
    let player;

    beforeEach(async () => {
      const hash = await bcrypt.hash(password, 10);

        player = await Player.create({
        name,
        surname,
        email,
        password: hash,
        link,
        preferedPosition,
        score
      });

      playerId = player.id;
    });

    it("should succeed adding score to player object", async () => {

        debugger
      const score = "60";

      const res = await logic.addScoreToPlayer(playerId, score);

      const player = await res.findById(playerId);

      expect(player.score).toEqual(score);
    });

    it("should fail on undefined playerId", () => {
      const playerId = undefined;
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on numeric playerId", () => {
      const playerId = 10;
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on boolean playerId", () => {
      const playerId = false;
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on object playerId", () => {
      const playerId = {};
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on array playerId", () => {
      const playerId = [];
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on empty playerId", () => {
      const playerId = "";
      const score = `123`;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(Error("playerId cannot be empty"));
    });

    it("should fail on undefined score", () => {
      const playerId = player.id;
      const score = undefined;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(score + " is not string"));
    });

    it("should fail on numeric score", () => {
      const playerId = player.id;
      const score = 10;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(score + " is not string"));
    });

    it("should fail on boolean score", () => {
      const playerId = player.id;
      const score = false;

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(score + " is not string"));
    });

    it("should fail on object score", () => {
      const playerId = player.id;
      const score = {};

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(score + " is not string"));
    });

    it("should fail on array score", () => {
      const playerId = player.id;
      const score = [];

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(TypeError(score + " is not string"));
    });

    it("should fail on empty score", () => {
      const playerId = player.id;
      const score = "";

      expect(() => {
        logic.addScoreToPlayer(playerId, score);
      }).toThrow(Error("score cannot be empty"));
    });
  });
  after(() =>
    Promise.all([Player.deleteMany(), Match.deleteMany(), Team.deleteMany()]).then(() =>
      mongoose.disconnect()
    )
  );
});
