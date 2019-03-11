import axios from "axios";

const padelcatApi = {
  setUpDefaults: () => {
    axios.defaults.baseURL = "http://localhost:8000/api";
    axios.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        throw error;
      }
    );
  },
  setUptokenOnRequest: token => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  registerPlayer: (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
  ) => {
    if (typeof name !== "string") throw TypeError(`${name} is not a string`);
    if (!name.trim().length) throw Error("name is empty");

    if (typeof surname !== "string")
      throw TypeError(`${surname} is not a string`);
    if (!surname.trim().length) throw Error("surname is empty");

    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");

    if (typeof passwordConfirm !== "string")
      throw TypeError(`${passwordConfirm} is not a string`);
    if (!passwordConfirm.trim().length)
      throw Error("password confirm is empty");

    return axios.post(
      "/register",
      JSON.stringify({
        name,
        surname,
        email,
        password,
        passwordConfirm,
        preferedPosition,
        link
      })
    );
  },

  authenticatePlayer: (email, password) => {
    if (typeof email !== "string") throw TypeError(`${email} is not a string`);
    if (!email.trim().length) throw Error("email is empty");

    if (typeof password !== "string")
      throw TypeError(`${password} is not a string`);
    if (!password.trim().length) throw Error("password is empty");
    return axios.post("/authenticate", JSON.stringify({ email, password }), {
      headers: { "content-type": "application/json" }
    });
  },

  retrievePlayer: () => {
    return axios.get("/retrievePlayers");
  },

  retrieveScoreScrapping: () => {
    return axios.get("/retrieveScore");
  },

  setScorePlayers: link => {
    return axios.put("/setScorePlayer", JSON.stringify({ link }));
  },

  retrieveMatchesScrapping: () => {
    return axios.get("/retrieveMatches");
  },

  setIdMatches: () => {
    return axios.put("/setScorePlayer");
  },

  addAvalabilityPlayer: (playerId, matchId) => {
    return axios.put(
      "/availabilityPlayer",
      JSON.stringify({ playerId, matchId }),
      {
        headers: { "content-type": "application/json" }
      }
    );
  },

   retrieveAvailabilityPlayers: (matchId) => {
     return axios.get(`/retrieveAvailabilityPlayers/${matchId}`)
   }
};

export default padelcatApi;
