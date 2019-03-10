"use strict";

const { Player, Match, Team } = require("../models");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//const webData = require("../models/scrapping");
const fs = require("fs");
const webData = require("../models/scrapping/webData.json");
const axios = require("axios");
const cheerio = require("cheerio");

const {
  SchemaTypes: { ObjectId },
  Schema
} = mongoose;

const logic = {
  /**
   *
   * Register a new player
   *
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

  registerPlayer(name, surname, email, password, link, preferedPosition) {
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

      const hash = await bcrypt.hash(password, 10);

      const { id } = await Player.create({
        name,
        surname,
        email,
        password: hash,
        link,
        preferedPosition
      });
      //a player le anyado un campo que es id
      return id;
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

      return player.id;
    })();
  },

  retrievePlayers() {
    return Player.find({}, (err, players) => {
      if (!err) {
        return players;
      } else {
        throw err;
      }
    });
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
    return logic.retrieveScoreScrapping().then(response => {
      console.log(response);

      const matchingPlayer = response.filter(player => player.link === link);
      console.log(matchingPlayer);
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

  setIdMatches() {
    return logic.retrieveMatchesScrapping().then(response => {
      return response.map(({ matchId }) => {
        Match.create({ matchId: matchId });
      });
    });
  },

  retrieveAvailabilityPlayers(id) {
    const foundMatch = Match.findOne({ matchId: id }, (err, doc) => {
      if (!err) {
        throw Error(err);
      }
      return foundMatch.schema.obj.playersAvailable;
    });
  }
};

module.exports = logic;
