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

    it("should succeed on valid data", async () => {
      const id = await logic.registerPlayer(name, surname, email, password);

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

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on numeric name", () => {
      const name = 10;
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on boolean name", () => {
      const name = true;
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on object name", () => {
      const name = {};
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on array name", () => {
      const name = [];
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(name + " is not string"));
    });

    it("should fail on empty name", () => {
      const name = "";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(Error("name cannot be empty"));
    });

    it("should fail on undefined surname", () => {
      const name = "Manuel";
      const surname = undefined;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on numeric surname", () => {
      const name = "Manuel";
      const surname = 10;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on boolean surname", () => {
      const name = "Manuel";
      const surname = false;
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on object surname", () => {
      const name = "Manuel";
      const surname = {};
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on array surname", () => {
      const name = "Manuel";
      const surname = [];
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(surname + " is not string"));
    });

    it("should fail on empty surname", () => {
      const name = "Manuel";
      const surname = "";
      const email = "manuelbarzi@mail.com";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(Error("surname cannot be empty"));
    });

    it("should fail on undefined email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = undefined;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on numeric email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = 10;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on boolean email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = false;
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on object email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = {};
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on array email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = [];
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(email + " is not string"));
    });

    it("should fail on empty email", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "";
      const password = `123-${Math.random()}`;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(Error("email cannot be empty"));
    });

    it("should fail on undefined password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = undefined;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on numeric password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = 10;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on boolean password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = false;

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on object password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = {};

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on array password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = [];

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(TypeError(password + " is not string"));
    });

    it("should fail on empty password", () => {
      const name = "Manuel";
      const surname = "Barzi";
      const email = "manuelbarzi@mail.com";
      const password = "";

      expect(() => {
        logic.registerPlayer(name, surname, email, password);
      }).toThrow(Error("password cannot be empty"));
    });
  });

  describe('authenticate player', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    const email = `manuelbarzi-${Math.random()}@mail.com`
    const password = `123-${Math.random()}`

    beforeEach(() =>
        bcrypt.hash(password, 10)
            .then(hash => Player.create({ name, surname, email, password: hash }))
    )

    it('should succeed on correct credentials', () =>
        logic.authenticatePlayer(email, password)
            .then(id => expect(id).toBeDefined())
    )
})  
});
