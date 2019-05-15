//@ts-check
import restApi from ".";
import {
  ConnectionError,
  TimeoutError,
  ValueError,
  RequirementError,
} from "../../common/errors";

function randomString(length = 20) {
  return Number(Math.random() * 10 ** length).toString(35);
}

function generateRandomEmail() {
  return `test-${randomString()}@mail.com`;
}

describe("users", () => {
  const name = randomString();
  const surname = randomString();
  let email;
  const password = randomString();

  beforeEach(() => (email = generateRandomEmail()));

  describe("create", () => {
    it("should succeed on correct user data", () => 
      restApi.createUser(name, surname, email, password).then(res => {
        expect(res).toBeDefined();
        expect(res.message).toBe("Ok, user registered. ");
      })
    );

    it("should fail on retrying to register", () =>
      restApi.createUser(name, surname, email, password)
        .then(() => restApi.createUser(name, surname, email, password))
        .then(response => {
          expect(response).toBeDefined();
          expect(response.error).toBe(
            `user with username \"${email}\" already exists`
          );
        }));

    describe("sync fails", () => {
      it("should fail on undefined name", () => {
        const name = undefined;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`name is not optional`));
      });

      it("should fail on null name", () => {
        const name = null;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`name is not optional`));
      });

      it("should fail on empty name", () => {
        const name = "";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("name is empty"));
      });

      it("should fail on blank name", () => {
        const name = " \t    \n";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("name is empty"));
      });

      it("should fail on undefined surname", () => {
        const surname = undefined;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`surname is not optional`));
      });

      it("should fail on null surname", () => {
        const surname = null;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`surname is not optional`));
      });

      it("should fail on empty surname", () => {
        const surname = "";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("surname is empty"));
      });

      it("should fail on blank surname", () => {
        const surname = " \t    \n";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("surname is empty"));
      });

      it("should fail on undefined email", () => {
        const email = undefined;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`email is not optional`));
      });

      it("should fail on null email", () => {
        const email = null;

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new RequirementError(`email is not optional`));
      });

      it("should fail on empty email", () => {
        const email = "";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("email is empty"));
      });

      it("should fail on blank email", () => {
        const email = " \t    \n";

        expect(() =>
          restApi.createUser(name, surname, email, password)
        ).toThrowError(new ValueError("email is empty"));
      });
    });
  });

  describe("authenticate", () => {
    beforeEach(() =>
      restApi
        .createUser(name, surname, email, password)
    );

    it("should succeed on correct user credential", () =>
      restApi.loginUser(email, password).then(res => {
        expect(res).toBeDefined();

        const { token } = res;

        expect(typeof token).toBe("string");
        expect(token.length).toBeGreaterThan(0);
      }));

    it("should fail on non-existing user", () =>
      restApi
        .loginUser(
          (email = randomString() + "unexisting-user@mail.com"),
          password
        )
        .then(res => {
          expect(res).toBeDefined();
          expect(res.error).toBe(
            `user with username \"${email}\" does not exist`
          );
        }));
  });

  describe("retrieve", () => {
    let token;

    beforeEach(() => restApi.createUser(name, surname, email, password)
        .then(() => restApi.loginUser(email, password))
        .then(res => token = res.token)
    );

    it("should succeed on correct user id and token", () =>
      restApi.retrieveUser(token).then(response => {
        expect(response.name).toBe(name);
        expect(response.surname).toBe(surname);
        expect(response.email).toBe(email);
        expect(response.password).toBeUndefined();
      }));

  });

  describe("update", () => {
  });

  describe("when api url fails", () => {
    let url;

    beforeEach(() => {
      url = restApi.__url__;

      restApi.__url__ = "https://this-is-a-fake-url";
    });

    it("should fail on wrong api url", () => {
      restApi
        .createUser(name, surname, email, password)
        .then(() => {throw Error("should not reach this point")})
        .catch(error => {
          expect(error).toBeDefined();
          expect(error instanceof ConnectionError).toBeTruthy();
          expect(error.message).toBe("cannot connect");

        });
    });

    afterEach(() => (restApi.__url__ = url));
  });

  describe("when server responds too late", () => {
    const timeout = 1;

    beforeEach(() => (restApi.__timeout__ = timeout));

    it("should fail on too long wait", () => {
      restApi
        .createUser(name, surname, email, password)
        .then(() => {throw Error("should not reach this point") })
        .catch(error => {
          expect(error).toBeDefined();
          expect(error instanceof TimeoutError).toBeTruthy();
          expect(error.message).toBe(
            `time out, exceeded limit of ${timeout}ms`
          );
        });
    });

    afterEach(() => (restApi.__timeout__ = 0));
  });
});
