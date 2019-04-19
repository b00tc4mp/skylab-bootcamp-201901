"use strict";

fdescribe("user api", () => {
  describe("create", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = "123";

    beforeEach(() => {
      const randomUsernameSuffix = String(
        Math.floor(Math.random() * 9999999999)
      );
      username = `test-${randomUsernameSuffix}@gmail.com`;
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
  });

  fdescribe("authenticate", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = "123";

    beforeAll(done => {
      const randomUsernameSuffix = String(
        Math.floor(Math.random() * 9999999999)
      );
      username = `test-${randomUsernameSuffix}@gmail.com`;
      userApi.create(name, surname, username, password, () => {
        done();
      });
    });

    it("should succeed on correct user data", done => {
      userApi.authenticate(username, password, (response)  => {
        expect(response.status).toBe("OK");
        expect(typeof response.data.id).toBe("string");
        expect(typeof response.data. token).toBe("string");
        done();
      });
    });

    describe("should fail on wrong data", () => {    

      it("should fail on wrong password", done => {
        const wrongPassword = "456";

        userApi.authenticate(username, wrongPassword, (response)  => {
          expect(response.status).toBe("KO");
          expect(response.error).toBe("username and/or password wrong");
          done();
        });
      })
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

    describe("fails if no callback", () => {
      it("should succeed on correct user data", done => {
        userApi.authenticate(username, password, (response)  => {
          expect(response.status).toBe("OK");
          expect(typeof response.data.id).toBe("string");
          expect(typeof response.data. token).toBe("string");
          done();
        });
      });
    })

  });

  describe("update", () => {
    // TODO:
  });
});
