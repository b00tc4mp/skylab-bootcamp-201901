// External dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const chalk = require("chalk");

const urlScores =
  "https://www.setteo.com/torneos/lliga-padel-guinotprunera-18-19-a-fase-2w07/equipo/200081/";
const urlMatches =
  "https://www.setteo.com/torneos/lliga-padel-guinotprunera-18-19-a-fase-2w07/calendario/?categorias%5B%5D=162079&equipo=200081";
const outputFile = "webData.json";

const getWebScorePlayer = async url => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // New Lists
    const promises = $(".list-equipos li").map(async (i, el) => {
      
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

    return Promise.all(promises.get());
  } catch (error) {
    throw error;
  }
};

const getWebMatches = async url => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const promises = $(".partido").map(async (i, el) => {

      const matchId = $(el)
        .find("a")
        .attr("href").substring(31, 44);

      const date = $(el)
        .find(".datos small")
        .text().trim();

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
        .text().trim();

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

    return Promise.all(promises.get());
  } catch (error) {
    throw error;
  }
};

Promise.all([getWebScorePlayer(urlScores), getWebMatches(urlMatches)]).then(
  res => {
    fs.writeFile(outputFile, JSON.stringify(res, null, 4), err => {
      if (err) throw err
      console.log(
        chalk.yellow.bgBlue(
          `\n ${chalk.underline.bold(
            res.length
          )} Results exported successfully to ${chalk.underline.bold(
            outputFile
          )}\n`
        )
      );
    });
  }
);
