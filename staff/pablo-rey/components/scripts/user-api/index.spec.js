"use strict";

const randomUsername = `test-pr-${Math.floor(Math.random() * 999999999)}@mail.com`;

describe("user-api", () => {
  describe("register user", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = "123";

    beforeEach(() => {
      username = randomUsername();
    });

    afterEach(() => {
      username = undefined;
    })

    it("create an user", (done) => {
      userApi.register({ name, surname, username, password }, (result)=> {
        expect(result.status).toBe("OK");
        expect(result.data).toBeDefined();
        expect(typeof result.data.id).toBe('string');
        done();
      })
    });

    it("don't allow register twice same username", () => {
      userApi.register({ name, surname, username, password }, (result)=> {
        const { status, error } = result;
        expect(status).toBe("KO");
        expect(typeof error).toBe('string');
        expect(error).toBe('string'); // TODO:
        done();
      })
    });

  });
});
