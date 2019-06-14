"use strict";

require("dotenv").config();

require("isomorphic-fetch");

//const mongoose = require("mongoose");
const {
  mongoose,
  models: { Player, Match, Team }
} = require("padelcat-data");
const expect = require("expect");
const logic = require(".");
const bcrypt = require("bcrypt");
const axios = require("axios");
const cheerio = require("cheerio");

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

  describe("retrieve players", () => {
    it("should succeed on correct credentials", () => {
      return (async () => {
        const name = "Manuel";
        const surname = "Barzi";
        const email = `manuelbarzi-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;
        const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
        const preferedPosition = "left";
        const admin = false;
        const hash = await bcrypt.hash(password, 10);
        const { id } = await Player.create({
          name,
          surname,
          email,
          password: hash,
          link,
          preferedPosition,
          admin
        });

        const players = await logic.retrievePlayers();
        expect(players[0].name).toBe(name);
        expect(players[0].surname).toBe(surname);
        expect(players[0].email).toBe(email);
        expect(players[0].link).toBe(link);
        expect(players[0].preferedPosition).toBe(preferedPosition);
        expect(players[0].admin).toBe(admin);
      })();
    });

    it("should fail with no players", async () => {
      try {
        await logic.retrievePlayers();
      } catch (error) {
        expect(error.message.toBe(`There are no players in data`));
      }
    });
  });

  describe("getPlayerById", () => {
    it("should succeed on correct credentials", () => {
      return (async () => {
        const name = "Manuel";
        const surname = "Barzi";
        const email = `manuelbarzi-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;
        const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
        const preferedPosition = "left";
        const admin = false;
        const hash = await bcrypt.hash(password, 10);
        const { id } = await Player.create({
          name,
          surname,
          email,
          password: hash,
          link,
          preferedPosition,
          admin
        });

        const player = await logic.getPlayerById(id);
        expect(player.id).toBeDefined();
      })();
    });

    it("should fail if player don't exist", async () => {
      const playerId = "123";
      try {
        await logic.getPlayerById(playerId);
      } catch (error) {
        expect(error.message).toBe(
          `Cast to ObjectId failed for value "123" at path "_id" for model "Player"`
        );
      }
    });
    it("should fail on numeric playerId", () => {
      const playerId = 10;

      expect(() => {
        logic.getPlayerById(playerId);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on boolean playerId", () => {
      const playerId = false;

      expect(() => {
        logic.getPlayerById(playerId);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on object playerId", () => {
      const playerId = {};

      expect(() => {
        logic.getPlayerById(playerId);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on array playerId", () => {
      const playerId = [];

      expect(() => {
        logic.getPlayerById(playerId);
      }).toThrow(TypeError(playerId + " is not string"));
    });

    it("should fail on empty playerId", () => {
      const playerId = "";

      expect(() => {
        logic.getPlayerById(playerId);
      }).toThrow(Error("playerId cannot be empty"));
    });
  });

  describe("retrieve score from scrapping", () => {
    it("should succeed with correct data", async () => {
      beforeEach(() => {
        const urlScores =
          "https://www.setteo.com/torneos/lliga-padel-guinotprunera-18-19-a-fase-2w07/equipo/200081/";

        return (async url => {
          try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            // New Lists
            const playerScore = $(".list-equipos li").map((i, el) => {
              const link = $(el)
                .find("a")
                .attr("href");

              const imageUrl = $(el)
                .find("img")
                .attr("src");

              const score = $(el)
                .find("span")
                .text();

              const metadata = {
                link: link,
                imageUrl: imageUrl,
                score: score
              };
              return metadata;
            });
            return playerScore.get();
          } catch (error) {
            throw error;
          }
        })(urlScores);
      });

      const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
      const playersScore = await logic.retrieveScoreScrapping();
      expect(link).toBe(playersScore[13].link);
      expect(playersScore[13].imageUrl).toBeDefined();
      expect(playersScore[13].score).toBeDefined();
    });

    it("shouldn't be data with fail scrapping", async () => {
      try {
        await logic.retrieveScoreScrapping();
      } catch (error) {
        expect(error.message).toBe(
          `Cast to ObjectId failed for value "123" at path "_id" for model "Player"`
        );
      }
    });
  });

  describe("set score to player", () => {
    it("should succeed with correct data", () => {
      return async () => {
        const name = "Manuel";
        const surname = "Barzi";
        const email = `manuelbarzi-${Math.random()}@mail.com`;
        const password = `123-${Math.random()}`;
        const link = "https://www.setteo.com/usuario/serena-mejias-vazquez";
        const preferedPosition = "left";
        const admin = false;
        const hash = await bcrypt.hash(password, 10);
        const { id } = await Player.create({
          name,
          surname,
          email,
          password: hash,
          link,
          preferedPosition,
          admin
        });

        await logic.setScorePlayers(link);
        expect(score).toBeDefined();
      };
    });

    it("should fail with incorrect link", async () => {
      const link = "test";
      try {
        await logic.setScorePlayers(link);
      } catch (error) {
        expect(error.message).toBe(`Incorrect link`);
      }
    });

    it("should fail on undefined link", () => {
      const link = undefined;

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(TypeError(link + " is not string"));
    });

    it("should fail on numeric link", () => {
      const link = 10;

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(TypeError(link + " is not string"));
    });

    it("should fail on boolean link", () => {
      const link = false;

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(TypeError(link + " is not string"));
    });

    it("should fail on object link", () => {
      const link = {};

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(TypeError(link + " is not string"));
    });

    it("should fail on array link", () => {
      const link = [];

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(TypeError(link + " is not string"));
    });

    it("should fail on empty link", () => {
      const link = "";

      expect(() => {
        logic.setScorePlayers(link);
      }).toThrow(Error("link cannot be empty"));
    });
  });

  describe("retrieve match from scrapping", () => {
    it("should succeed with correct data", async () => {
      beforeEach(() => {
        const urlMatches =
          "https://www.setteo.com/torneos/lliga-padel-guinotprunera-18-19-a-fase-2w07/calendario/?categorias%5B%5D=162079&equipo=200081";

        return (async url => {
          try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            // New Lists
            const metadatas = $(".partido").map((i, el) => {
              const matchId = $(el)
                .find("a")
                .attr("href")
                .substring(31, 44);

              const date = $(el)
                .find(".datos small")
                .text()
                .trim();

              const team1 = $(el)
                .find(
                  ".equipos .equipo.individual .jugador.jugador1-izquierda a"
                )
                .text();

              const imageTeam1 = $(el)
                .find(
                  ".equipos .equipo.individual .jugador.jugador1-izquierda img"
                )
                .attr("data-src");

              const team2 = $(el)
                .find(".equipos .equipo.individual .jugador.jugador1-derecha a")
                .text();

              const imageTeam2 = $(el)
                .find(
                  ".equipos .equipo.individual .jugador.jugador1-derecha img"
                )
                .attr("data-src");

              const result = $(el)
                .find(".datos .resultado_eliminatoria span")
                .text()
                .trim();

              const location = $(el)
                .find(".datos p")
                .text();

              const metadata = {
                matchId: matchId,
                date: date,
                team1: team1,
                imageTeam1: imageTeam1,
                team2: team2,
                imageTeam2: imageTeam2,
                result: result,
                location: location
              };

              return metadata;
            });

            return metadatas.get();
          } catch (error) {
            throw error;
          }
        })(urlMatches);
      });
      const matches = await logic.retrieveMatchesScrapping();
      expect(matches[0].matchId).toBeDefined();
      expect(matches[0].date).toBeDefined();
      expect(matches[0].team1).toBeDefined();
      expect(matches[0].imageTeam1).toBeDefined();
      expect(matches[0].team2).toBeDefined();
      expect(matches[0].imageTeam2).toBeDefined();
      expect(matches[0].result).toBeDefined();
      expect(matches[0].location).toBeDefined();
    });

    // it("shouldn't be data with fail scrapping", async () => {
    //   debugger
    //   try {
    //     await logic.retrieveMatchesScrapping();
    //   } catch (error) {
    //     expect(error.message).toBe(
    //       `Cast to ObjectId failed for value "123" at path "_id" for model "Player"`
    //     );
    //   }
    // });
  });

  describe("get matches", () => {
    it("should succeed with correct data", async () => {
      const { id } = await Player.create({
        name: "Manuel",
        surname: "Barzi",
        email: `manuelbarzi-${Math.random()}@mail.com`,
        password: `123`,
        passwordConfirm: `123`,
        link: "https:www.setteo.com/usuario/serena-mejias-vazquez",
        preferedPosition: "left"
      });
      const matchId = "5c51f550b2ef2";
      const match = await Match.create({
        matchId
      });
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      match.playersAvailable.push(id);
      await match.save();
      await Match.findOneAndUpdate(
        { matchId },
        {
          playersChosen: {
            players
          }
        }
      );

      const matches = await logic.getMatchesWithData();

      const expectedMatch = matches.filter(
        match => match.matchId === matchId
      )[0];

      expect(expectedMatch.matchId).toBeDefined();
      expect(expectedMatch.date).toBeDefined();
      expect(expectedMatch.team1).toBeDefined();
      expect(expectedMatch.imageTeam1).toBeDefined();
      expect(expectedMatch.team2).toBeDefined();
      expect(expectedMatch.imageTeam2).toBeDefined();
      expect(expectedMatch.result).toBeDefined();
      expect(expectedMatch.location).toBeDefined();
      expect(expectedMatch.playersAvailable).toBeDefined();
      expect(expectedMatch.playersChosen).toBeDefined();
    });
  });

  describe("add availability to player", () => {
    it("should succeed getting players availability", async () => {
      const matchId = "5c51f550b2ef2";
      const match = await Match.create({
        matchId
      });
      const { id } = await Player.create({
        name: "Manuel",
        surname: "Barzi",
        email: `manuelbarzi-${Math.random()}@mail.com`,
        password: `123`,
        passwordConfirm: `123`,
        link: "https:www.setteo.com/usuario/serena-mejias-vazquez",
        preferedPosition: "left"
      });
      await logic.addAvailabilityPlayer(id, matchId);
      const newMatch = await Match.findById(match.id);
      const newPlayer = await Player.findById(id);
      expect(newMatch.playersAvailable.length).toBe(1);
      expect(newPlayer.availability.length).toBe(1);
    });

    it("should succeed getting players availability if match doesn't exist", async () => {
      const matchId = "5c51f550b2ef2";
      const { id } = await Player.create({
        name: "Manuel",
        surname: "Barzi",
        email: `manuelbarzi-${Math.random()}@mail.com`,
        password: `123`,
        passwordConfirm: `123`,
        link: "https:www.setteo.com/usuario/serena-mejias-vazquez",
        preferedPosition: "left"
      });
      await logic.addAvailabilityPlayer(id, matchId);
      const newMatch = await Match.findOne({ matchId });
      const newPlayer = await Player.findById(id);
      expect(newMatch.playersAvailable.length).toBe(1);
      expect(newPlayer.availability.length).toBe(1);
    });

    it("should fail on numeric playerId", () => {
      const playerId = 10;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on boolean playerId", () => {
      const playerId = false;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on object playerId", () => {
      const playerId = {};
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on array playerId", () => {
      const playerId = [];
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on empty playerId", () => {
      const playerId = "";
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(Error("playerId cannot be empty"));
    });

    it("should fail on numeric matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = 10;
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on boolean matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = false;
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on object matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = {};
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on array matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = [];
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on empty matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = "";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(Error("matchId cannot be empty"));
    });
  });

  describe("delete availability to player", () => {
    it("should succeed deleting players availability", async () => {
      const matchId = "5c51f550b2ef2";
      const match = await Match.create({
        matchId
      });
      const { id } = await Player.create({
        name: "Manuel",
        surname: "Barzi",
        email: `manuelbarzi-${Math.random()}@mail.com`,
        password: `123`,
        passwordConfirm: `123`,
        link: "https:www.setteo.com/usuario/serena-mejias-vazquez",
        preferedPosition: "left"
      });
      await Player.findByIdAndUpdate(
        { _id: id },
        { $push: { availability: matchId } }
      );
      const matchFound = await Match.findById(match.id);
      matchFound.playersAvailable.push(id);
      await match.save();

      await logic.deleteAvailabilityPlayer(id, matchId);
      const newMatch = await Match.findById(match.id);
      const newPlayer = await Player.findById(id);
      expect(newMatch.playersAvailable.length).toBe(0);
      expect(newPlayer.availability.length).toBe(0);
    });

    it("should fail with no match", async () => {
      const matchId = "test";
      const { id } = await Player.create({
        name: "Manuel",
        surname: "Barzi",
        email: `manuelbarzi-${Math.random()}@mail.com`,
        password: `123`,
        passwordConfirm: `123`,
        link: "https:www.setteo.com/usuario/serena-mejias-vazquez",
        preferedPosition: "left"
      });
      try {
        await logic.deleteAvailabilityPlayer(id, matchId);
      } catch (error) {
        expect(error.message).toBe(`match does not exist`);
      }
    });

    it("should fail on numeric playerId", () => {
      const playerId = 10;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on boolean playerId", () => {
      const playerId = false;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on object playerId", () => {
      const playerId = {};
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on array playerId", () => {
      const playerId = [];
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("playerId is not string"));
    });

    it("should fail on empty playerId", () => {
      const playerId = "";
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(Error("playerId cannot be empty"));
    });

    it("should fail on numeric matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = 10;
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on boolean matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = false;
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on object matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = {};
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on array matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = [];
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on empty matchId", () => {
      const playerId = "5c8d1f54fde1e30d88d3aeb5";
      const matchId = "";
      expect(() => {
        logic.addAvailabilityPlayer(playerId, matchId);
      }).toThrow(Error("matchId cannot be empty"));
    });
  });

  describe("add chosen players", () => {
    it("should succeed getting players chosen", async () => {
      const matchId = "5c51f550b2ef2";
      const match = await Match.create({
        matchId
      });
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };

      await logic.addChosenPlayers(players, matchId);
      const newMatch = await Match.findById(match.id);
      expect(newMatch.playersChosen).toBeDefined();
      expect(newMatch.playersChosen.players).toEqual(players);
    });

    it("should succeed getting players availability if match doesn't exist", async () => {
      const matchId = "5c51f550b2ef2";
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      await logic.addChosenPlayers(players, matchId);
      const newMatch = await Match.findOne({ matchId });
      expect(newMatch.playersChosen).toBeDefined();
      expect(newMatch.playersChosen.players).toEqual(players);
    });

    it("should fail on numeric players", () => {
      const players = 10;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("players is not object"));
    });

    it("should fail on boolean players", () => {
      const players = false;
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("players is not object"));
    });

    it("should fail on object players", () => {
      const players = "players";
      const matchId = "5c51f550b2ef2";
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("players is not object"));
    });

    it("should fail on numeric matchId", () => {
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      const matchId = 10;
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on boolean matchId", () => {
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      const matchId = false;
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on object matchId", () => {
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      const matchId = {};
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on array matchId", () => {
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      const matchId = [];
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(TypeError("matchId is not string"));
    });

    it("should fail on empty matchId", () => {
      const players = {
        playersChosen: {
          "firstPair-firstPlayer": "5c8501eecd540c0f100accd1",
          "firstPair-secondPlayer": "5c8501eecd540c0f100accd2",
          "secondPair-firstPlayer:": "5c8501eecd540c0f100accd3",
          "secondPair-secondPlayer": "5c8501eecd540c0f100accd4",
          "thirdPair-firstPlayer": "5c8501eecd540c0f100accd5",
          "thirdPair-secondPlayer": "5c8501eecd540c0f100accd6"
        }
      };
      const matchId = "";
      expect(() => {
        logic.addChosenPlayers(players, matchId);
      }).toThrow(Error("matchId cannot be empty"));
    });
  });

  after(() =>
    Promise.all([
      Player.deleteMany(),
      Match.deleteMany(),
      Team.deleteMany()
    ]).then(() => mongoose.disconnect())
  );
});
