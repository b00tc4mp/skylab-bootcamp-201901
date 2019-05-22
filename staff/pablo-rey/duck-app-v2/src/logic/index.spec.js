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
            expect(error.message).toBe(`user with email "${wrongEmail}" does not exist`);
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
            expect(error.message).toBe('wrong credentials');
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
    let token;

    beforeEach(() => {
      const username = generateRandomEmail();
      const password = randomString();
      return restApi
        .createUser(randomString(), randomString(), username, password)
        .then(() => restApi.loginUser(username, password))
        .then(res => {
          return (token = logic.__token__ = res.token);
        });
    });

    describe('toggle fav duck', () => {
      let duckId;

      beforeEach(() => restApi.searchDucks(token, '').then(ducks => (duckId = ducks[0].id)));

      it('should succeed adding fav on first time', () =>
        logic
          .toggleFavorite(duckId)
          .then(({ message }) => expect(message).toBe('Ok, duck toggled.'))
          .then(() => restApi.retrieveFavDucks(token))
          .then(favs => {
            expect(favs).toBeDefined();
            expect(favs instanceof Array).toBeTruthy();
            expect(favs.length).toBe(1);
            expect(favs[0].id).toBe(duckId);
          }));

      it('should succeed removing fav on second time', () =>
        logic
          .toggleFavorite(duckId)
          .then(() => logic.toggleFavorite(duckId))
          .then(() => restApi.retrieveFavDucks(token))
          .then(favs => {
            expect(favs).toBeDefined();
            expect(favs instanceof Array).toBeTruthy();
            expect(favs.length).toBe(0);
          }));

      it('should fail on null duck id', () => {
        duckId = null;

        expect(() => logic.toggleFavorite(duckId)).toThrowError(
          new RequirementError('id|duck is not optional')
        );
      });

      // TODO more cases
    });

    describe('retrieve fav ducks', () => {
      let _favs;

      beforeEach(() => {
        _favs = [];

        return restApi.searchDucks(token, '').then(ducks => {
          for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * ducks.length);

            _favs[i] = ducks.splice(randomIndex, 1)[0].id;
          }
        });
      });

      it('should succeed adding fav on first time', () =>
        logic.retrieveFavDucks(token).then(ducks => {
          ducks.forEach(({ id, title, imageUrl, description, price }) => {
            const isFav = _favs.some(fav => fav === id);

            expect(isFav).toBeTruthy();
            expect(typeof title).toBe('string');
            expect(title.length).toBeGreaterThan(0);
            expect(typeof imageUrl).toBe('string');
            expect(imageUrl.length).toBeGreaterThan(0);
            expect(typeof description).toBe('string');
            expect(description.length).toBeGreaterThan(0);
            expect(typeof price).toBe('string');
            expect(price.length).toBeGreaterThan(0);
          });
        }));
    });

    describe('search ducks', () => {
      it('should succeed on correct query', () =>
        logic.searchDucks('yellow').then(ducks => {
          expect(ducks).toBeDefined();
          expect(ducks instanceof Array).toBeTruthy();
          expect(ducks.length).toBe(13);
        }));

      // TODO other cases
    });
  });
});
