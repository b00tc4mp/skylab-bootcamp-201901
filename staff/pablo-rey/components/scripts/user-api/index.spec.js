"use strict";

function randomString(length = 20) {
  return Number(Math.random() * 10 ** length).toString(35)
}

function generateRandomEmail() {
  return `test-${randomString()}@mail.com`;
}

describe("user api", () => {
  describe("create", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = randomString();

    beforeEach(() => {
      username = generateRandomEmail();
    });

    describe("create & not duplicate", () => {
      it("should succeed on correct user data", done => {
        userApi.create(name, surname, username, password, function(response) {
          expect(response).toBeDefined();

          const {
            status,
            data: { id }
          } = response;

          expect(status).toBe("OK");
          expect(typeof id).toBe("string");
          expect(id.length).toBeGreaterThan(0);

          done();
        });
      });

      describe("on already existing user", () => {
        beforeEach(done =>
          userApi.create(name, surname, username, password, done)
        );

        it("should fail on retrying to register", done => {
          userApi.create(name, surname, username, password, function(response) {
            expect(response).toBeDefined();

            const { status, error } = response;

            expect(status).toBe("KO");
            expect(error).toBe(
              `user with username \"${username}\" already exists`
            );

            done();
          });
        });
      });
    });

    describe("fails on parameters", () => {
      describe("fails for name", () => {
        it("should fail on undefined name", () => {
          const name = undefined;
          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `name is not optional`);
        });

        it("should fail on null name", () => {
          const name = null;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `name is not optional`);
        });

        it("should fail on empty name", () => {
          const name = "";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "name is empty");
        });

        it("should fail on blank name", () => {
          const name = " \t    \n";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "name is empty");
        });
      });

      describe("fails for surname", () => {
        it("should fail on undefined surname", () => {
          const surname = undefined;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `surname is not optional`);
        });

        it("should fail on null surname", () => {
          const surname = null;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `surname is not optional`);
        });

        it("should fail on empty surname", () => {
          const surname = "";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "surname is empty");
        });

        it("should fail on blank surname", () => {
          const surname = " \t    \n";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "surname is empty");
        });
      });

      describe("fails for username", () => {
        it("should fail on undefined username", () => {
          const username = undefined;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on null username", () => {
          const username = null;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on empty username", () => {
          const username = "";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });

        it("should fail on blank username", () => {
          const username = " \t    \n";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });
      });

      describe("fails for password", () => {
        it("should fail on undefined password", () => {
          const password = undefined;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on null password", () => {
          const password = null;

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on empty password", () => {
          const password = "";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });

        it("should fail on blank password", () => {
          const password = " \t    \n";

          expect(() =>
            userApi.create(name, surname, username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });
      });

      describe("fails for callback", () => {
        it("should fail on no callback", () => {
          expect(() => {
            userApi.create(name, surname, username, password);
          }).toThrowError(RequirementError, `undefined is not optional`);
        });

        it("should fail on wrong callback", () => {
          expect(() => {
            userApi.create(name, surname, username, password, 1);
          }).toThrowError(TypeError, `undefined 1 is not a function`);
        });
      });      
    });
  });

  describe("authenticate", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = randomString();

    beforeAll(done => {
      username = generateRandomEmail();
      userApi.create(name, surname, username, password, () => {
        done();
      });
    });

    it("should succeed on correct user data", done => {
      userApi.authenticate(username, password, response => {
        expect(response.status).toBe("OK");
        expect(typeof response.data.id).toBe("string");
        expect(typeof response.data.token).toBe("string");
        done();
      });
    });

    it("should return different tokens on diferent request", done => {
      userApi.authenticate(
        username,
        password,
        ({ data: { token: token1 } }) => {
          setTimeout(() => {
            userApi.authenticate(
              username,
              password,
              ({ data: { token: token2 } }) => {
                expect(token1).not.toBe(token2);
                done();
              }
            );
          }, 1200);
        }
      );
    });

    describe("should fail on wrong data", () => {
      it("should fail on wrong password", done => {
        const wrongPassword = "456";

        userApi.authenticate(username, wrongPassword, response => {
          expect(response.status).toBe("KO");
          expect(response.error).toBe("username and/or password wrong");
          done();
        });
      });
      it("should fail on wrong username", done => {
        const wrongUsername = generateRandomEmail();

        userApi.authenticate(wrongUsername, password , response => {
          expect(response.status).toBe("KO");
          expect(response.error).toBe(`user with username "${wrongUsername}" does not exist`);
          done();
        });
      });

    });

    describe("fails on parameters", () => {
      describe("fails for username", () => {
        it("should fail on undefined username", () => {
          const username = undefined;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on null username", () => {
          const username = null;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on empty username", () => {
          const username = "";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });

        it("should fail on blank username", () => {
          const username = " \t    \n";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });
      });

      describe("fails for password", () => {
        it("should fail on undefined password", () => {
          const password = undefined;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on null password", () => {
          const password = null;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on empty password", () => {
          const password = "";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });

        it("should fail on blank password", () => {
          const password = " \t    \n";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });
      });

      describe("fails for callback", () => {
        it("should fail on no callback", () => {
          expect(() => {
            userApi.authenticate(username, password);
          }).toThrowError(RequirementError, `undefined is not optional`);
        });

        it("should fail on wrong callback", () => {
          expect(() => {
            userApi.authenticate(username, password, 1);
          }).toThrowError(TypeError, `undefined 1 is not a function`);
        });
      });
    });
  });

  describe("retrieve", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = randomString();
    let token;
    let userId;

    beforeAll(done => {
      username = generateRandomEmail();
      userApi.create(name, surname, username, password, () => {
        userApi.authenticate(username, password, response => {
          if (response.status === "OK") {
            userId = response.data.id;
            token = response.data.token;
          } else throw Error("unexpected behaviour in test");
          done();
        });
      });
    });

    it("should succeed on correct user data", done => {
      userApi.retrieve(userId, token, ({ status, data }) => {
        expect(status).toBe("OK");
        expect(data.name).toBe(name);
        expect(data.surname).toBe(surname);
        expect(data.username).toBe(username);
        expect(data.id).toBe(userId);
        done();
      });
    });

    describe("should retrieve only correct user data", () => {
      const _name = "second user name";
      const _surname = "second user surname";
      let _username;
      const _password = "123";
      let _userId;

      beforeAll(done => {
        _username = generateRandomEmail();
        userApi.create(_name, _surname, _username, _password, response => {
          if (response.status === "OK") {
            _userId = response.data.id;
          } else throw Error("unexpected behaviour in test");
          done();
        });
      });

      it("should retrieve the correct data for first user", done => {
        userApi.retrieve(userId, token, ({ status, data }) => {
          expect(status).toBe("OK");
          expect(data.name).toBe(name);
          expect(data.surname).toBe(surname);
          expect(data.username).toBe(username);
          expect(data.id).toBe(userId);
          done();
        });
      });

      it("should not retrieve other user data", done => {
        userApi.retrieve(_userId, token, ({ status, error }) => {
          expect(status).toBe("KO");
          expect(error).toBe(
            `token id "${userId}" does not match user "${_userId}"`
          );
          done();
        });
      });
    });

    describe("fails on parameters", () => {
      describe("fails for username", () => {
        it("should fail on undefined username", () => {
          const username = undefined;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on null username", () => {
          const username = null;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `username is not optional`);
        });

        it("should fail on empty username", () => {
          const username = "";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });

        it("should fail on blank username", () => {
          const username = " \t    \n";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "username is empty");
        });
      });

      describe("fails for password", () => {
        it("should fail on undefined password", () => {
          const password = undefined;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on null password", () => {
          const password = null;

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(RequirementError, `password is not optional`);
        });

        it("should fail on empty password", () => {
          const password = "";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });

        it("should fail on blank password", () => {
          const password = " \t    \n";

          expect(() =>
            userApi.authenticate(username, password, () => {})
          ).toThrowError(ValueError, "password is empty");
        });
      });

      describe("fails for callback", () => {
        it("should fail on no callback", () => {
          expect(() => {
            userApi.retrieve(userId, token);
          }).toThrowError(RequirementError, `undefined is not optional`);
        });

        it("should fail on wrong callback", () => {
          expect(() => {
            userApi.retrieve(userId, token, 1);
          }).toThrowError(TypeError, `undefined 1 is not a function`);
        });
      });
    });
  });

  describe("update", () => {
    // TODO:
  });
});
