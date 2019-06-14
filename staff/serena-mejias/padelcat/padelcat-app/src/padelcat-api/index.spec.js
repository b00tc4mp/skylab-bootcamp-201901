import padelcatApi from "./index.js";
import axios from "axios";

describe("padelcatApi", () => {
  //   describe("setUpDefaults", () => {
  //     it("should", () => {
  //       padelcatApi.setUpDefaults();
  //       expect(axios.interceptors.response.use(response)).toBe();
  //     });
  //   });
  describe("setUptokenOnRequest", () => {
    it("should", () => {
      padelcatApi.setUptokenOnRequest("token");
      expect(axios.defaults.headers.common["Authorization"]).toBe(
        "Bearer token"
      );
    });
  });
  describe("registerPlayer", () => {
    it("should post to register with correct params", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      padelcatApi.registerPlayer(
        "test",
        "test",
        "email@email.com",
        "p",
        "p",
        "left",
        "https://www.setteo.com/usuario/test"
      );
      expect(mockPost.mock.calls[0][0]).toBe("/register");
      expect(axios.post.mock.calls[0][1]).toBe(
        JSON.stringify({
          name: "test",
          surname: "test",
          email: "email@email.com",
          password: "p",
          passwordConfirm: "p",
          preferedPosition: "left",
          link: "https://www.setteo.com/usuario/test"
        })
      );
      expect(axios.post.mock.calls[0][2]).toEqual({
        headers: { "content-type": "application/json" }
      });
    });
    it("should throw error if name is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          5,
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if name is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if surname is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          [],
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if surname is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if email is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          {},
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if email is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if password is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          2,
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if password is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if passwordConfirm is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          false,
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if passwordConfirm is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if preferredPosition is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          [],
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if preferredPosition is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "",
          "link"
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if link is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferredPosition",
          {}
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if link is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferredPosition",
          ""
        )
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
  describe("authenticatePlayer", () => {
    it("should post to /authenticate with correct params", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      padelcatApi.authenticatePlayer("email@email.com", "password");
      expect(axios.post.mock.calls[0][0]).toBe("/authenticate");
      expect(axios.post.mock.calls[0][1]).toBe(
        JSON.stringify({ email: "email@email.com", password: "password" })
      );
      expect(axios.post.mock.calls[0][2]).toEqual({
        headers: { "content-type": "application/json" }
      });
    });
    it("should throw error if email is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.authenticatePlayer(5, "password")
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if email is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() =>
        padelcatApi.authenticatePlayer("", "password")
      ).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if password is not a string", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() => padelcatApi.authenticatePlayer("", null)).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should throw error if password is empty", () => {
      const mockPost = jest.fn();
      axios.post = mockPost;
      expect(() => padelcatApi.authenticatePlayer("email", "")).toThrowError();
      expect(axios.post).not.toHaveBeenCalled();
    });
  });
  describe("retrievePlayers", () => {
    it("should GET /retrievePlayers", () => {
      const mockGet = jest.fn();
      axios.get = mockGet;
      padelcatApi.retrievePlayers();
      expect(axios.get).toHaveBeenCalledWith("/retrievePlayers");
    });
  });
  describe("getPlayerById", () => {
    it("should GET /retrievePlayers", () => {
      const mockGet = jest.fn();
      axios.get = mockGet;
      padelcatApi.getPlayerById();
      expect(axios.get).toHaveBeenCalledWith("/getPlayerById");
    });
  });
  describe("retrieveScoreScrapping", () => {
    it("should GET /retrieveScore", () => {
      const mockGet = jest.fn();
      axios.get = mockGet;
      padelcatApi.retrieveScoreScrapping();
      expect(axios.get).toHaveBeenCalledWith("/retrieveScore");
    });
  });
  describe("setScorePlayers", () => {
    it("should PUT /setScorePlayer", () => {
      const mockPut = jest.fn();
      axios.put = mockPut;
      padelcatApi.setScorePlayers("link");
      expect(axios.put.mock.calls[0][0]).toBe("/setScorePlayer");
      expect(axios.put.mock.calls[0][1]).toBe(JSON.stringify({ link: "link" }));
    });
    // it("should throw error if link is not string", () => {
    //   const mockPut = jest.fn();
    //   axios.put = mockPut;
    //   padelcatApi.setScorePlayers(5);
    //   expect(axios.put).not.toHaveBeenCalled();
    // });
    // it("should throw error if link is empty", () => {
    //   const mockPut = jest.fn();
    //   axios.put = mockPut;
    //   padelcatApi.setScorePlayers("");
    //   expect(axios.put).not.toHaveBeenCalled();
    // });
  });
  describe("retrieveMatchesScrapping", () => {
    it("should GET /retrieveScore", () => {
      const mockGet = jest.fn();
      axios.get = mockGet;
      padelcatApi.retrieveMatchesScrapping();
      expect(axios.get).toHaveBeenCalledWith("/retrieveMatches");
    });
  });
  describe("getMatchesWithData", () => {
    it("should GET /retrieveScore", () => {
      const mockGet = jest.fn();
      axios.get = mockGet;
      padelcatApi.getMatchesWithData();
      expect(axios.get).toHaveBeenCalledWith("/getMatchesWithData");
    });
  });
  describe("addAvalabilityPlayer", () => {
    it("should PUT /availabilityPlayer", () => {
      const mockPut = jest.fn();
      axios.put = mockPut;
      padelcatApi.addAvalabilityPlayer("playerId", "matchId");
      expect(axios.put.mock.calls[0][0]).toBe("/availabilityPlayer");
      expect(axios.put.mock.calls[0][1]).toBe(
        JSON.stringify({ playerId: "playerId", matchId: "matchId" })
      );
      expect(axios.put.mock.calls[0][2]).toEqual({
        headers: { "content-type": "application/json" }
      });
    });
  });
  describe("deleteAvalabilityPlayer", () => {
    it("should PUT /deleteAvailabilityPlayer", () => {
      const mockPut = jest.fn();
      axios.put = mockPut;
      padelcatApi.deleteAvalabilityPlayer("playerId", "matchId");
      expect(axios.put.mock.calls[0][0]).toBe("/deleteAvailabilityPlayer");
      expect(axios.put.mock.calls[0][1]).toBe(
        JSON.stringify({ playerId: "playerId", matchId: "matchId" })
      );
      expect(axios.put.mock.calls[0][2]).toEqual({
        headers: { "content-type": "application/json" }
      });
    });
  });
//   describe("addChosenPlayers", () => {
//     it("should PUT /deleteAvailabilityPlayer", () => {
//       const mockPut = jest.fn();
//       axios.put = mockPut;
//       padelcatApi.addChosenPlayers({
//         playersChosen: {
//           playersChosen: "playerId",
//           matchId: "matchId"
//         }
//       });
//       expect(axios.put.mock.calls[0][0]).toBe("/chosenPlayers");
//       expect(axios.put.mock.calls[0][1]).toBe(
//         JSON.stringify({
//           playersChosen: {
//             playersChosen: "playerId",
//             matchId: "matchId"
//           }
//         })
//       );
//       expect(axios.put.mock.calls[0][2]).toEqual({
//         headers: { "content-type": "application/json" }
//       });
//     });
//   });
});
