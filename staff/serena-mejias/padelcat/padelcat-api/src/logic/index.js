"use strict";

const {
  models: { Player, Match, Team }
} = require("padelcat-data");
const bcrypt = require("bcrypt");
const axios = require("axios");
const cheerio = require("cheerio");

const logic = {
  /**
   *
   * Register a new player
   *
   * @param {boolean} name
   * @param {string} name
   * @param {string} surname
   * @param {string} playername
   * @param {string} password
   *
   * @throws {TypeError} - When any param is not a string.
   * @throws {Error} - When any param is empty.
   * @throws {Error} - When API returns an error.
   *
   * @returns {Object} - player Id.
   *
   */

  registerPlayer(
    name,
    surname,
    email,
    password,
    link,
    preferedPosition,
    admin
  ) {
    //if (typeof admin !== "boolean") throw TypeError(`${admin} is not boolean`);

    if (typeof name !== "string") throw TypeError(`${name} is not string`);
    if (!name.trim().length) throw Error("name cannot be empty");
    if (typeof surname !== "string")
      throw TypeError(`${surname} is not string`);
    if (!surname.trim().length) throw Error("surname cannot be empty");
    if (typeof email !== "string") throw TypeError(`${email} is not string`);
    if (!email.trim().length) throw Error("email cannot be empty");
    if (typeof password !== "string")
      throw TypeError(`${password} is not string`);
    if (!password.trim().length) throw Error("password cannot be empty");
    if (typeof link !== "string") throw TypeError(`${link} is not string`);
    if (!link.trim().length) throw Error("link cannot be empty");
    return (async () => {
      const player = await Player.findOne({ email });
      if (player) {
        throw Error(`player wiith email ${player.email} already exists`);
      }
      if (admin) {
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
        await this.setScorePlayers(link);
        return id;
      } else {
        const hash = await bcrypt.hash(password, 10);
        const { id } = await Player.create({
          name,
          surname,
          email,
          password: hash,
          link,
          preferedPosition
        });
        await this.setScorePlayers(link);
        return id;
      }
    })();
  },

  /**
   * Authenticates player by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  authenticatePlayer(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return (async () => {
      const player = await Player.findOne({ email });

      if (!player) throw Error(`player with email ${email} not found`);

      const match = await bcrypt.compare(password, player.password);

      if (!match) throw Error("wrong credentials");

      return player;
    })();
  },

  retrievePlayers() {
    return (async () => {
      const players = await Player.find()
      if(!players) throw Error(`There are no players in data`)
      return players
    })();
  },

  getPlayerById(playerId) {
    //if (typeof playerId !== "string") throw TypeError(`${playerId} is not string`);
    //if (!playerId.trim().length) throw Error("playerId cannot be empty");
    return (async () => {
      const player = await Player.findById(playerId);
      if(!player) throw Error(`playerId doesn't exist`)

      return player;
    })();
  },

  retrieveScoreScrapping() {
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
  },

  setScorePlayers(link) {
    return this.retrieveScoreScrapping().then(response => {
      const matchingPlayer = response.filter(player => player.link === link);
      if (matchingPlayer.length === 1) {
        return Player.findOneAndUpdate(
          { link: link },
          { score: matchingPlayer[0].score }
        );
      }
    });
  },

  retrieveMatchesScrapping() {
    const urlMatches =
      "https://www.setteo.com/torneos/lliga-padel-guinotprunera-18-19-a-fase-2w07/calendario/?categorias%5B%5D=162079&equipo=200081";

    return (async url => {
      try {
        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

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
            .find(".equipos .equipo.individual .jugador.jugador1-izquierda a")
            .text();

          const imageTeam1 = $(el)
            .find(".equipos .equipo.individual .jugador.jugador1-izquierda img")
            .attr("data-src");

          const team2 = $(el)
            .find(".equipos .equipo.individual .jugador.jugador1-derecha a")
            .text();

          const imageTeam2 = $(el)
            .find(".equipos .equipo.individual .jugador.jugador1-derecha img")
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
  },

  getMatchesWithData() {
    return (async () => {
      const dataMatches = await this.retrieveMatchesScrapping();
      const newArray = dataMatches.map(async scrappingMatch => {
        const match = await Match.findOne({
          matchId: scrappingMatch.matchId
        }).populate("playersAvailable");
        const {
          matchId,
          date,
          team1,
          imageTeam1,
          team2,
          imageTeam2,
          result,
          location
        } = scrappingMatch;
        const { playersAvailable = [], playersChosen = [] } = match;

        return {
          matchId,
          date,
          team1,
          imageTeam1,
          team2,
          imageTeam2,
          result,
          location,
          playersAvailable,
          playersChosen
        };
      });
      return Promise.all(newArray).then(response => response);
    })();
  },

  addAvailabilityPlayer(playerId, matchId) {
    return (async () => {
      await Player.findByIdAndUpdate(
        { _id: playerId },
        { $push: { availability: matchId } }
      );
      const match = await Match.findOne({ matchId });
      if (!match) {
        await Match.create({ matchId, playersAvailable: playerId });
      } else {
        match.playersAvailable.push(playerId);
        await match.save();
      }
    })();
  },

  deleteAvailabilityPlayer(playerId, matchId) {
    return (async () => {
      const player = await Player.findById(playerId);
      const index = player.availability.indexOf(matchId);
      player.availability.splice(index, 1);
      await player.save();

      const match = await Match.findOne({ matchId });
      if (!match) {
        throw Error("match does not exist");
      } else {
        const match = await Match.findOne({ matchId });
        const index = await match.playersAvailable.indexOf(playerId);
        match.playersAvailable.splice(index, 1);
        await match.save();
      }
    })();
  },

  addChosenPlayers(playersId, matchId) {
    return (async () => {
      const match = await Match.findOne({ matchId });
      if (!match) {
        await Match.create({
          matchId,
          playersChosen: {
            playersId
          }
        });
      } else {
        await Match.findOneAndUpdate(
          { matchId },
          {
            playersChosen: {
              playersId
            }
          }
        );
      }
    })();
  }

  // retrieveAvailabilityPlayers(matchId) {
  //   return (async () => {
  //     const match = await Match.findOne({ matchId });
  //     if (match) {
  //       return match.playersAvailable;
  //     } else {
  //       throw Error("match does not exist");
  //     }
  //   })();
  // }
};

module.exports = logic;
