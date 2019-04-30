import userApi from '../data/user-api';
import logic from '.';
import { RequirementError } from '../common/errors';

const randomString = (length = 20) => Number(Math.random() * 9 ** length).toString(35);

describe('logic', () => {
  describe('logicUser', () => {
    let name, surname, password, email;
    let id, token;

    beforeEach(() => {
      name = randomString();
      surname = randomString();
      password = randomString();
      email = `${randomString()}@mail.com`;
    });

    describe('registerUser', () => {
      it('should register a new user data on correct params', () => {
        return logic
          .registerUser(email, password, name, surname)
          .then(res => expect(res).toBe(undefined))
          .then(() => userApi.auth(email, password))
          .then(res => {
            const {
              data: { id, token },
            } = res;
            return userApi.retrieve(id, token);
          })
          .then(res => {
            const { data } = res;
            expect(data.username).toBe(email);
            expect(data.password).toBeUndefined();
            expect(data.name).toBe(name);
            expect(data.surname).toBe(surname);
          });
      });

      describe('fail param', () => {
        it('must return a promise', () =>
          expect(
            logic.registerUser(email, password, name, surname) instanceof Promise
          ).toBeTruthy());

        it('fails if no email', () =>
          expect(() => logic.registerUser(undefined, password, name, surname)).toThrowError(
            new RequirementError(`email is not optional`)
          ));

        it('fails if email is blank', () =>
          expect(() => logic.registerUser('  \t\n', password, name, surname)).toThrowError(
            Error(`email is empty`)
          ));

        it('fails if no password', () =>
          expect(() => logic.registerUser(email, undefined, name, surname)).toThrowError(
            new RequirementError(`password is not optional`)
          ));

        it('fails if password is blank', () =>
          expect(() => logic.registerUser(email, '  \t\n', name, surname)).toThrowError(
            Error(`password is empty`)
          ));

        it('fails if no name', () =>
          expect(() => logic.registerUser(email, password, undefined, surname)).toThrowError(
            new RequirementError(`name is not optional`)
          ));

        it('fails if name is blank', () =>
          expect(() => logic.registerUser(email, password, '  \t\n', surname)).toThrowError(
            Error(`name is empty`)
          ));

        it('fails if no surname', () =>
          expect(() => logic.registerUser(email, password, name, undefined)).toThrowError(
            new RequirementError(`surname is not optional`)
          ));

        it('fails if surname is blank', () =>
          expect(() => logic.registerUser(email, password, name, '  \t\n')).toThrowError(
            Error(`surname is empty`)
          ));
      });
    });

    describe('loginUser', () => {
      it('must login on correct user data', () =>
        userApi
          .create(email, password, { name, surname })
          .then(res => expect(res.status).toBe('OK'))
          .then(() => logic.loginUser(email, password))
          .then(res => {
            expect(typeof res).toBe('boolean');
            expect(res).toBeTruthy();
            expect(typeof logic.userId).toBe('string');
            expect(typeof logic.token).toBe('string');
          }));

      describe('fails with wrong data', () => {
        beforeEach(() =>
          userApi
            .create(email, password, { name, surname })
            .then(res => expect(res.status).toBe('OK'))
        );

        it('must return an error message on wrong user data', () => {
          const wrongUsername = randomString();
          return logic.loginUser(wrongUsername, password).then(res => {
            expect(typeof res).toBe('string');
            expect(res).toBe(`user with username "${wrongUsername}" does not exist`);
            expect(logic.userId).toBeNull();
            expect(logic.token).toBeNull();
          });
        });

        it('must return an error message on wrong user password', () => {
          const wrongPassword = randomString();
          return logic.loginUser(email, wrongPassword).then(res => {
            expect(typeof res).toBe('string');
            expect(res).toBe('username and/or password wrong');
            expect(logic.userId).toBeNull();
            expect(logic.token).toBeNull();
          });
        });
      });

      describe('fail param', () => {
        it('must return a promise', () =>
          userApi
            .create(email, password, { name, surname })
            .then(res => expect(res.status).toBe('OK'))
            .then(() => expect(logic.loginUser(email, password) instanceof Promise).toBeTruthy()));

        it('fails if no email', () =>
          expect(() => logic.loginUser(undefined, password)).toThrowError(
            new RequirementError(`email is not optional`)
          ));

        it('fails if email is blank', () =>
          expect(() => logic.loginUser('  \t\n', password)).toThrowError(Error(`email is empty`)));

        it('fails if no password', () =>
          expect(() => logic.loginUser(email, undefined)).toThrowError(
            new RequirementError(`password is not optional`)
          ));

        it('fails if password is blank', () =>
          expect(() => logic.loginUser(email, '  \t\n')).toThrowError(Error(`password is empty`)));
      });
    });

    describe('retrieveUser', () => {
      it('must retrieve on correct user data', () =>
        userApi
          .create(email, password, {
            name,
            surname,
          })
          .then(({ status }) => expect(status).toBe('OK'))
          .then(() => userApi.auth(email, password))
          .then(res => {
            expect(res.status).toBe('OK');
            logic.userId = res.data.id;
            logic.token = res.data.token;
          })
          .then(() => logic.retrieveUser())
          .then(user => {
            const originalUser = {
              name,
              surname,
              username: email,
              id: logic.userId,
            };
            expect(user).toEqual(originalUser);
          }));
    });
  });
});
