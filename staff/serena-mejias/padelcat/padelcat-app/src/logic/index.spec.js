import logic from "./index.js";

describe("logic", () => {
  describe("registerPlayer", () => {
    it("should succed with correct parameters", () => {
      const test = logic.registerPlayer(
        "name",
        "surname",
        "email",
        "password",
        "password",
        "preferedPosition",
        "link"
      );
      test.then(r => {
        expect(r).toEqual({});
      });
    });
    it("should throw error if name is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          5,
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if name is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if surname is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          [],
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if surname is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "",
          "email",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if email is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          {},
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if email is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "",
          "password",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if password is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          2,
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if password is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "",
          "passwordConfirm",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if passwordConfirm is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          false,
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if passwordConfirm is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "",
          "preferedPosition",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if preferredPosition is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          [],
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if preferredPosition is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "",
          "link"
        )
      ).toThrowError();
    });
    it("should throw error if link is not a string", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferredPosition",
          {}
        )
      ).toThrowError();
    });
    it("should throw error if link is empty", () => {
      expect(() =>
        logic.registerPlayer(
          "name",
          "surname",
          "email",
          "password",
          "passwordConfirm",
          "preferredPosition",
          ""
        )
      ).toThrowError();
    });
  });

  describe("loginPlayer", () => {
    it("should succed with correct parameters", () => {
      const test = logic.loginPlayer("email", "password");
      test.then(r => {
        expect(r).toEqual({});
      });
    });
    it("should throw error if email is not a string", () => {
      expect(() => logic.loginPlayer(5, "password")).toThrowError();
    });
    it("should throw error if email is empty", () => {
      expect(() => logic.loginPlayer("", "password")).toThrowError();
    });
    it("should throw error if password is not a string", () => {
      expect(() => logic.loginPlayer("email", null)).toThrowError();
    });
    it("should throw error if password is empty", () => {
      expect(() => logic.loginPlayer("email", "")).toThrowError();
    });
  });
  describe("getStoredtoken", () => {
    it("should retrieve token of session storage", () => {
      const token = logic.storeToken("tokenTest");
      const response = logic.getStoredtoken(token);
      expect(response).toEqual("tokenTest");
    });
    // it("should throw error if there is no token in session storage", () => {
    //     const token = logic.storeToken();
    //     const response = logic.getStoredtoken(token);
    //     expect(response).toThrowError();
    // });
  });
  describe("isPlayerLoggedIn", () => {
    it("should check if player is logged in", () => {
      const token = logic.storeToken("tokenTest");
      const response = logic.isPlayerLoggedIn();
      expect(response).toEqual(true);
    });
    // it("should check if player is logged in", () => {
    //     const token = logic.storeToken(undefined);
    //     const response = logic.isPlayerLoggedIn();
    //     expect(response).toEqual(false);
    // });
  });
  describe("logout", () => {
    it("should clear session storage", () => {
      const token = logic.storeToken("tokenTest");
      const response = logic.logout();
      expect(response).toEqual();
    });
  });
  //   describe("storeToken", () => {
  //     it("should set token in session storage", () => {
  //       const token = logic.storeToken("tokenTest");
  //       expect(token).toEqual("tokenTest");
  //     });
  //   });
  describe("retrievePlayers", () => {
    it("should retrieve data players", () => {
      const test = logic.retrievePlayers();
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("getPlayerId", () => {
    it("should retrieve player id", () => {
      const test = logic.getPlayerById("tokenTest");
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("retrieveScoresScrapping", () => {
    it("should retrieve score from scrapping", () => {
      const test = logic.retrieveScoresScapping();
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });

  describe("setScorePlayers", () => {
    it("should retrieve player id", () => {
      const test = logic.setScorePlayers("https://www.setteo.com/usuario/test");
      test.then(res => {
        expect(res).toEqual({});
      });
    });
    it("should throw error if link is not a string", () => {
      expect(() =>
        logic.setScorePlayers(
          {}
        )
      ).toThrowError();
    });
    it("should throw error if link is empty", () => {
      expect(() =>
        logic.setScorePlayers(
          ""
        )
      ).toThrowError();
    });
  });
  describe("retrieveMatches", () => {
    it("should retrieve data matches", () => {
      const test = logic.retrieveMatches();
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("getMatchesWithData", () => {
    it("should retrieve macthes", () => {
      const test = logic.getMatchesWithData();
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("addAvailavilityPlayer", () => {
    it("should add availavility of a player", () => {
      const test = logic.addAvalabilityPlayer("playerId", "matchId");
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("deleteAvailavilityPlayer", () => {
    it("should delete availavility of a player", () => {
      const test = logic.deleteAvalabilityPlayer("playerId", "matchId");
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
  describe("addChosenPlayers", () => {
    it("should delete availavility of a player", () => {
      const test = logic.addChosenPlayers("playerId", "matchId");
      test.then(res => {
        expect(res).toEqual({});
      });
    });
  });
});
