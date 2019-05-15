//@ts-check
import logic from '.';
import restApi from '../data/rest-api';
import { LogicError, ValueError, RequirementError, FormatError } from '../common/errors';

function randomString(length = 20) {
  return Number(Math.random() * 10 ** length).toString(35);
}

function generateRandomEmail() {
  return `test-${randomString()}@mail.com`;
}

describe('logic', () => {
  describe('users logic', () => {
    describe('register', () => {
      const name = 'test';
      const surname = 'test';
      let email;
      let password;

      beforeEach(() => {
        email = generateRandomEmail();
        password = randomString();
      });

      it('should succeed on correct user data', () => {
        return logic
          .registerUser(name, surname, email, password)
          .then(response => {
            expect(response).toBeUndefined();
          })
          .catch(error => {
            throw error;
          });
      });
    });

    describe('login', () => {
      const name = 'test';
      const surname = 'test';
      let email;
      let password;

      beforeAll(() => {
        email = generateRandomEmail();
        password = randomString();

        logic.__token__ = undefined;
        return restApi.createUser(name, surname, email, password);
      });

      it('should succeed on correct user data', () =>
        logic.loginUser(email, password).then(() => {
          expect(typeof logic.__token__).toBe('string');
        }));

      it('should fail on wrong username', () => {
        const wrongEmail = generateRandomEmail();

        return logic
          .loginUser(wrongEmail, password)
          .then(() => {
            throw Error('expected no response here');
          })
          .catch(error => {
            expect(error.message).toBe(`user with username "${wrongEmail}" does not exist`);
          });
      });

      it('should fail on wrong password', () => {
        const wrongPassword = randomString();

        return logic
          .loginUser(email, wrongPassword)
          .then(() => {
            throw Error('expected no response here');
          })
          .catch(error => {
            expect(error.message).toBe('username and/or password wrong');
          });
      });
    });

    describe('retrieve user', () => {
      const name = 'test';
      const surname = 'test';
      let email;
      let password;

      beforeEach(() => {
        email = generateRandomEmail();
        password = randomString();
      });

      test('should retrieve correct data for user id', () =>
        restApi
          .createUser(name, surname, email, password)
          .then(() => restApi.loginUser(email, password))
          .then(response => {
            logic.__token__ = response.token;
          })
          .then(() => logic.retrieveUser())
          .then(user => {
            expect(user.name).toBe(name);
            expect(user.surname).toBe(surname);
            expect(user.email).toBe(email);
          }));
    });
  });

  describe('ducks', () => {

    beforeEach(() => {
      const username = generateRandomEmail();
      const password = randomString();
      return restApi
        .createUser(randomString(), randomString(), username, password)
        .then(() => restApi.loginUser(username, password))
        .then(res => {
          return (logic.__token__ = res.token);
        });
    });

    describe('search ducks', () => {
      it('should succeed on correct query', () =>
        logic.searchDucks('yellow').then(ducks => {
          expect(ducks).toBeDefined();
          expect(ducks instanceof Array).toBeTruthy();
          expect(ducks.length).toBe(13);
        }));

      // TODO fail cases
    });
  });
});
