"use strict";

import logic from ".";

describe("logic testing", () => {
  describe("register", () => {
    let name = "Manuel";
    let surname = "Barzi";
    let email = `manuelbarzi@mail.com-${Math.random()}`;
    let password = "123";
    let passwordConfirm = password;

    it("should succed on correct data", () =>
      logic
        .register(name, surname, email, password, passwordConfirm)
        .then(result => expect(result).toBeUndefined));

    it("should fail on empty name", () =>
      expect(() => logic.register("", surname, email, password)).toThrowError(
        "name is empty"
      ));

    it("should fail on empty surname", () =>
      expect(() => logic.register(name, "", email, password)).toThrowError(
        "surname is empty"
      ));

    it("should fail on empty email", () =>
      expect(() => logic.register(name, surname, "", password)).toThrowError(
        "email is empty"
      ));

    it("should fail on empty password", () => {
      expect(() => logic.register(name, surname, email, "")).toThrowError(
        "password is empty"
      );
    });

    it("should fail when name is a number", () =>
      expect(() => logic.register(1, surname, email, password)).toThrowError(
        "1 is not a string"
      ));

    it("should fail when surname is a bolean", () =>
      expect(() => logic.register(name, true, email, password)).toThrowError(
        "true is not a string"
      ));

    it("should fail when email is an array", () =>
      expect(() =>
        logic.register(name, surname, [1, 2, 3], password)
      ).toThrowError("1,2,3 is not a string"));

    it("should fail when password is an object", () =>
      expect(() =>
        logic.register(name, surname, email, { wrong: "password" })
      ).toThrowError("[object Object] is not a string"));
  });

  describe("login", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "789";
    const passwordConfirm = password;

    const emailTest = "dasdasdasd";
    const passwordTest = "111";

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;
      return logic.register(name, surname, email, password, passwordConfirm);
    });

    it("should succeed on correct credentials", () =>
      logic.login(email, password).then(() => {
        expect(logic.__userId__).toBeDefined();
        expect(logic.__userApiToken__).toBeDefined();
      }));

    it("should fail on wrong email", () =>
      logic
        .login(emailTest, password)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(
            `user with username \"dasdasdasd\" does not exist`
          );
        }));

    it("should fail on wrong password", () =>
      logic
        .login(email, passwordTest)
        .then(() => {
          throw Error("should not have passed by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`username and/or password wrong`);
        }));

    it("should fail on empty email", () =>
      expect(() => logic.login("", password)).toThrowError("email is empty"));

    it("should fail on empty password", () => {
      expect(() => logic.login(email, "")).toThrowError("password is empty");
    });

    it("should fail when email is an array", () =>
      expect(() => logic.login([1, 2, 3], password)).toThrowError(
        "1,2,3 is not a string"
      ));

    it("should fail when password is an object", () =>
      expect(() => logic.login(email, { wrong: "password" })).toThrowError(
        "[object Object] is not a string"
      ));
  });

  describe("retrieveUser", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;


    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic
        .register(name, surname, email, password, passwordConfirm)
        .then(() => logic.login(email, password));
    });

    it("should succeed with correct credentials", () =>
      logic.updateUser({ favourites: [{ id: "1011334", name: "3-D Man" }, { id: "1011335", name: "Hulk" }] })
        .then(() => logic.retrieveUser(logic.__userId__, logic.__userApiToken__))
        .then(user => {
          expect(user.favourites).toEqual([{ id: "1011334", name: "3-D Man" }, { id: "1011335", name: "Hulk" }])
          expect(user.favourites instanceof Array).toBeTruthy()})
      );
  });

  describe("search characters", () => {
    let query = "Hulk";

    it("should fail on empty query", () => {
      expect(() => logic.searchCharacter("")).toThrowError("query is empty");
    });

    it("should fail when query is a number", () => {
      expect(() => logic.searchCharacter(1)).toThrowError(`1 is not a string`);
    });

    it("should fail when query is a boolean", () => {
      expect(() => logic.searchCharacter(true)).toThrowError(`true is not a string`);
    });

    it("should fail when query is an array", () => {
      expect(() => logic.searchCharacter([1, 2, 3])).toThrowError(`1,2,3 is not a string`);
    });

    it("should get characters on matching query", () => {
      return logic.searchCharacter(query).then(data => {
        expect(data).toBeDefined();
        expect(typeof data === "object").toBeTruthy();
        const { count, results } = data;
        expect(count).toBe(1);
        expect(results[0].name).toEqual(query);
      });
    });

    it("should fail on returning 0 characters", () => {
      return logic
        .searchCharacter("12312313123")
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`No characters found`);
        });
    });
  });

  describe("retrieve character", () => {
    let characterId = "1011334";

    it("should fail on empty characterId", () => {
      expect(() => logic.retrieveCharacter("")).toThrowError(
        "characterId is empty"
      );
    });

    it("should fail when characterId is a number", () => {
      expect(() => logic.retrieveCharacter(1)).toThrowError(
        `1 is not a string`
      );
    });

    it("should fail when characterId is a boolean", () => {
      expect(() => logic.retrieveCharacter(true)).toThrowError(
        `true is not a string`
      );
    });

    it("should fail when characterId is an array", () => {
      expect(() => logic.retrieveCharacter([1, 2, 3])).toThrowError(
        `1,2,3 is not a string`
      );
    });

    it("should fail on missmatching characterId", () => {
      return logic
        .retrieveCharacter("12312313123")
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`We couldn't find that character`);
        });
    });

    it("should get a character on matching id", () => {
      return logic.retrieveCharacter(characterId).then(data => {
        expect(data).toBeDefined();
        expect(typeof data === "object").toBeTruthy();
        const { count } = data;
        expect(count).toBe(1);
      });
    });
  });

  describe("retrieve comic", () => {
    let comicId = "6958";

    it("should fail on empty comicId", () => {
      expect(() => logic.retrieveComic("")).toThrowError("comicId is empty");
    });

    it("should fail when comicId is a number", () => {
      expect(() => logic.retrieveComic(1)).toThrowError(`1 is not a string`);
    });

    it("should fail when comicId is a boolean", () => {
      expect(() => logic.retrieveComic(true)).toThrowError(
        `true is not a string`
      );
    });

    it("should fail when comicId is an array", () => {
      expect(() => logic.retrieveComic([1, 2, 3])).toThrowError(
        `1,2,3 is not a string`
      );
    });

    it("should fail on missmatching comicId", () => {
      logic
        .retrieveComic("12312313123")
        .then(() => {
          throw Error("should not pass by here");
        })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error.message).toBe(`We couldn't find that comic_issue`);
        });
    });

    it("should get a comic on matching id", () => {
      return logic.retrieveComic(comicId).then(data => {
        expect(data).toBeDefined();
        expect(typeof data === "object").toBeTruthy();
        const { count } = data;
        expect(count).toBe(1);
      });
    });
  });

  describe("retrieveFavourites", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;
    const data = { favourites: [{ id: "1011334", name: "3-D Man" }] };

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic
        .register(name, surname, email, password, passwordConfirm)
        .then(() => logic.login(email, password))
        .then(() => logic.updateUser(data));
    });

    it("should succed adding a new favourite item", () => {
      return logic.retrieveFavourites()
        .then(data => {
          expect(data).toBeDefined()
          expect(data).toEqual([{ id: "1011334", name: "3-D Man" }])})
    });

    it("should succed adding a new favourite item", () => {
      return logic.retrieveFavourites()
        .then(data => {
          expect(data).toBeDefined()
          expect(data).toEqual([{ id: "1011334", name: "3-D Man" }])})
    });


  });

  describe("updateFavourites", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;
    const data = { favourites: [{ id: "1011334", name: "3-D Man" }] };
    const data2 = { id: "1011335", name: "Hulk" };

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic
        .register(name, surname, email, password, passwordConfirm)
        .then(() => logic.login(email, password))
        .then(() => logic.updateUser(data))
    });

    it("should succed pushing a new favourite item", () => {
      return logic.updateFavourites(data2)
        .then(data => {
          expect(data).toBeDefined()
          expect(data).toEqual([{ id: "1011334", name: "3-D Man" }, { id: "1011335", name: "Hulk" }])
        })
    });
  });

  describe("updateUser", () => {
    const name = "Manuel";
    const surname = "Barzi";
    let email;
    const password = "123";
    const passwordConfirm = password;
    const data = { favourites: [{ id: "1011334", name: "3-D Man" }] };

    beforeEach(() => {
      email = `manuelbarzi@mail.com-${Math.random()}`;

      return logic.register(name, surname, email, password, passwordConfirm)
        .then(() => logic.login(email, password))
    });

    it("should succed pushing new data", () => {
      return logic.updateUser(data)
        .then(data => {
          expect(data).toBeDefined()
          expect(data.status).toBe("OK")})
    });

    it("should fail when data is not an object", () => {
        expect(() => logic.updateUser(12)).toThrowError("12 is not an object");
    });

  });


});
