import padelcatApi from "../padelcat-api";

const logic = {
  registerPlayer: (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) => {
    if (typeof name !== "string") throw TypeError(name + " is not a string");
    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string")
      throw TypeError(surname + " is not a string");
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof email !== "string") throw TypeError(email + " is not a string");
    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");
    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirm !== "string")
      throw TypeError(passwordConfirm + " is not a string");
    if (!passwordConfirm.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirm) throw Error("passwords do not match");

    if (typeof link !== "string") throw TypeError(link + " is not a string");
    if (!link.trim().length) throw Error("link cannot be empty");

    return padelcatApi
      .registerPlayer(
        name,
        surname,
        email,
        password,
        passwordConfirm,
        preferedPosition,
        link
      )
      .then(() => {});
  },

  loginPlayer: (email, password) => {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return padelcatApi.authenticatePlayer(email, password);
  },

  getStoredtoken: () => {
    const token = sessionStorage.getItem("tokenKey");
    if (token) {
      padelcatApi.setUptokenOnRequest(token);
    }
    return token;
  },

  isPlayerLoggedIn: () => {
    const token = sessionStorage.getItem("tokenKey");

    return !!token;
  },

  logout: () => {
    sessionStorage.clear();
  },

  storeToken: token => {
    padelcatApi.setUptokenOnRequest(token);
    sessionStorage.setItem("tokenKey", token);
  },

  retrievePlayers: () => {
    return padelcatApi.retrievePlayers();
  },

  getPlayerById: token => {
    return padelcatApi.getPlayerById(token);
  },

  retrieveScoresScapping: () => {
    return padelcatApi.retrieveScoreScrapping();
  },

  setScorePlayers: link => {
    if (typeof link !== "string") throw TypeError(link + " is not a string");
    if (!link.trim().length) throw Error("link cannot be empty");
    
    return padelcatApi.setScorePlayers(link);
  },

  retrieveMatches: () => {
    return padelcatApi.retrieveMatchesScrapping();
  },

  getMatchesWithData: () => {
    return padelcatApi.getMatchesWithData();
  },

  addAvalabilityPlayer: (playerId, matchId) => {
    return padelcatApi.addAvalabilityPlayer(playerId, matchId);
  },

  deleteAvalabilityPlayer: (playerId, matchId) => {
    return padelcatApi.deleteAvalabilityPlayer(playerId, matchId);
  },

  addChosenPlayers: (playersChosen, matchId) => {
    return padelcatApi.addChosenPlayers(playersChosen, matchId);
  }
};

export default logic;
