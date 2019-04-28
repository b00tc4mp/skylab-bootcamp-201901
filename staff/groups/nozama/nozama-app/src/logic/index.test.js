import userApi from '../data/user-api'
import logic from '.'
import {
  RequirementError
} from '../common/errors'

const randomString = (length = 20) => Number(Math.random() * 9 ** length).toString(35)

describe.only('logic', () => {
  describe('logicUser', () => {
    describe('registerUser', () => {
      let name, surname, password, email;

      beforeEach(() => {
        name = randomString();
        surname = randomString()
        password = randomString()
        email = `${randomString()}@mail.com`
      })

      it('should register a new user data on correct params', () => {
        return logic.registerUser(email, password, name, surname)
          .then(res => expect(res).toBe(undefined))
          .then(() => userApi.auth(email, password))
          .then(res => {
            const {
              data: {
                id,
                token
              }
            } = res
            return userApi.retrieve(id, token)
          }).then(res => {
            const {
              data
            } = res
            expect(data.username).toBe(email)
            expect(data.password).toBeUndefined()
            expect(data.name).toBe(name)
            expect(data.surname).toBe(surname)
          })
      })

      describe('fail param', () => {
        it('must return a promise', () =>
          expect(logic.registerUser(email, password, name, surname) instanceof Promise).toBeTruthy());

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
          expect(() => logic.registerUser(email, "  \t\n", name, surname)).toThrowError(
            Error(`password is empty`)
          ));

        it('fails if no name', () =>
          expect(() => logic.registerUser(email, password, undefined, surname)).toThrowError(
            new RequirementError(`name is not optional`)
          ));

        it('fails if name is blank', () =>
          expect(() => logic.registerUser(email, password, "  \t\n", surname)).toThrowError(
            Error(`name is empty`)
          ));

        it('fails if no surname', () =>
          expect(() => logic.registerUser(email, password, name, undefined)).toThrowError(
            new RequirementError(`surname is not optional`)
          ));

        it('fails if surname is blank', () =>
          expect(() => logic.registerUser(email, password, name, "  \t\n")).toThrowError(
            Error(`surname is empty`)
          ));
      })
    });

    describe('loginUser', () => {
      let name, surname, password, email;

      beforeEach(() => {
        name = randomString();
        surname = randomString()
        password = randomString()
        email = `${randomString()}@mail.com`
      })

      it('must login on correct user data', () =>
        userApi.create(email, password, {
          name,
          surname
        })
        .then((res) => expect(res.status).toBe('OK'))
        .then(() => logic.loginUser(email, password))
        .then((res) => {
          expect(res).toBeTruthy();
          expect(typeof logic.id).toBe('string');
          expect(typeof logic.token).toBe('string');
        })
      )
    })

    describe('retrieveUser', () => {
      let name, surname, password, email;
      let id, token;

      beforeEach(() => {
        name = randomString();
        surname = randomString()
        password = randomString()
        email = `${randomString()}@mail.com`
      })

      it('must retrieve on correct user data', () =>
        userApi.create(email, password, {
          name,
          surname
        })
        .then((res) => expect(res.status).toBe('OK'))
        .then(() => userApi.auth(email, password))
        .then((res) => {
          expect(res.status).toBe('OK');
          logic.id = res.data.id;
          logic.token = res.data.token;
        })
        .then(() => logic.retrieveUser())
        .then(user => {
          const originalUser = {
            name,
            surname,
            username: email,
            id: logic.id,
          };
          expect(user).toEqual(originalUser);
        })
      )
    })
  })
});