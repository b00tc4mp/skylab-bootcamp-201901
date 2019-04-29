import userApi from '.';
import { RequirementError } from '../../common/errors';

const randomString = (length = 20) => Number(Math.random() * 9 ** length).toString(35);

describe('user-api', () => {
  describe('create', () => {
    const name = 'test';
    const surname = 'test';
    let username;
    const password = randomString();
    const otherFields = {};

    beforeEach(() => (username = randomString()));

    describe('create & not duplicate', () => {
      beforeEach(() => {
        for (let ii = 0, ll = Math.floor(Math.random() * 10); ii < ll; ii++) {
          otherFields[randomString()] = randomString();
        }
      });

      it('should succeed on correct user data', () =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(res => {
            expect(res).toBeDefined();
            expect(res.status).toBe('OK');
            expect(res.data).toBeDefined();
            const { data } = res;
            expect(data.id).toBeDefined();
            expect(typeof data.id).toBe('string');
          }));

      it('should fail on same username', () =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(() =>
            userApi.create(username, password, {
              ...otherFields,
            })
          )
          .then(res => {
            expect(res).toBeDefined();
            expect(res.status).toBe('KO');
            expect(res.error).toBeDefined();
            const { error } = res;
            expect(error).toBe(`user with username "${username}" already exists`);
          }));
    });

    describe('fail param', () => {
      it('must return a promise', () =>
        expect(userApi.create(username, password, {}) instanceof Promise).toBeTruthy());

      it('fails if no username', () =>
        expect(() => userApi.create(undefined, password, {})).toThrowError(
          new RequirementError(`username is not optional`)
        ));

      it('fails if username is blank', () =>
        expect(() => userApi.create('  \t\n', password, {})).toThrowError(
          Error(`username is empty`)
        ));

      it('fails if no password', () =>
        expect(() => userApi.create(username, undefined, {})).toThrowError(
          new RequirementError(`password is not optional`)
        ));

      it('fails if password is blank', () =>
        expect(() => userApi.create(username, '  \t\n', {})).toThrowError(
          Error(`password is empty`)
        ));

      it('fails if extra data is not an object', () =>
        expect(() => userApi.create(username, password, 1)).toThrowError(
          TypeError(`data 1 is not a object`)
        ));
    });
  });

  describe('auth', () => {
    let username, password, _id;

    beforeEach(() => {
      username = randomString();
      password = randomString();
    });

    it('should succeed on correct user data', () =>
      userApi
        .create(username, password, {})
        .then(res => {
          expect(res).toBeDefined();
          expect(res.status).toBe('OK');
          expect(res.data).toBeDefined();
          const { data } = res;
          _id = data.id;
        })
        .then(() => userApi.auth(username, password))
        .then(res => {
          expect(res).toBeDefined();
          expect(res.status).toBe('OK');
          expect(res.data).toBeDefined();
          const {
            data: { id, token },
          } = res;
          expect(id).toBe(_id);
          expect(typeof token).toBe('string');
        }));

    describe('should fail on wrong data', () => {
      const wrongParam = randomString();

      beforeEach(() => userApi.create(username, password));

      it('should fail on wrong username', () =>
        userApi.auth(wrongParam, password).then(res => {
          expect(res).toBeDefined();
          expect(res.status).toBe('KO');
          const { error } = res;
          expect(error).toBe(`user with username "${wrongParam}" does not exist`);
        }));

      it('should fail on wrong username', () =>
        userApi.auth(username, wrongParam).then(res => {
          expect(res).toBeDefined();
          expect(res.status).toBe('KO');
          const { error } = res;
          expect(error).toBe(`username and/or password wrong`);
        }));
    });

    describe('fail param', () => {
      it('must return a promise', () =>
        expect(userApi.auth(username, password, {}) instanceof Promise).toBeTruthy());

      it('fails if no username', () =>
        expect(() => userApi.auth(undefined, password, {})).toThrowError(
          new RequirementError(`username is not optional`)
        ));

      it('fails if username is blank', () =>
        expect(() => userApi.auth('  \t\n', password, {})).toThrowError(
          Error(`username is empty`)
        ));

      it('fails if no password', () =>
        expect(() => userApi.auth(username, undefined, {})).toThrowError(
          new RequirementError(`password is not optional`)
        ));

      it('fails if password is blank', () =>
        expect(() => userApi.auth(username, '  \t\n', {})).toThrowError(
          Error(`password is empty`)
        ));
    });
  });

  describe('retrieve', () => {
    let username, password, otherFields;

    beforeEach(() => {
      username = randomString();
      password = randomString();
      otherFields = {};
      for (let ii = 0, ll = Math.floor(Math.random() * 10); ii < ll; ii++) {
        otherFields[randomString()] = randomString();
      }
    });

    it('should retrieve on correct user data', () => {
      let id, token;
      return userApi
        .create(username, password, {
          ...otherFields,
        })
        .then(() => userApi.auth(username, password))
        .then(res => {
          const { data } = res;
          id = data.id;
          token = data.token;
        })
        .then(() => userApi.retrieve(id, token))
        .then(res => {
          expect(res).toBeDefined();
          const { status, data } = res;
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({
            ...otherFields,
            username,
            id,
          });
        });
    });

    describe('fail param', () => {
      let id, token;

      beforeAll(() =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(() => userApi.auth(username, password))
          .then(res => {
            id = res.data.id;
            token = res.data.token;
          })
      );

      it('must return a promise', () =>
        expect(userApi.retrieve(id, token) instanceof Promise).toBeTruthy());

      it('fails if no id', () =>
        expect(() => userApi.retrieve(undefined, token)).toThrowError(
          new RequirementError(`id is not optional`)
        ));
      it('fails if id is blank', () =>
        expect(() => userApi.retrieve('  \t\n', token)).toThrowError(Error(`id is empty`)));

      it('fails if no token', () =>
        expect(() => userApi.retrieve(id, undefined)).toThrowError(
          new RequirementError(`token is not optional`)
        ));

      it('fails if token is blank', () =>
        expect(() => userApi.retrieve(id, '  \t\n')).toThrowError(Error(`token is empty`)));
    });
  });

  describe('update', () => {
    let username, password, otherFields;

    beforeEach(() => {
      username = randomString();
      password = randomString();
      otherFields = {};
      for (let ii = 0, ll = Math.floor(Math.random() * 10); ii < ll; ii++) {
        otherFields[randomString()] = randomString();
      }
    });

    it('should update on correct id and token', () => {
      let id, token, newValues;

      return userApi
        .create(username, password, {
          ...otherFields,
        })
        .then(() => userApi.auth(username, password))
        .then(res => {
          const { data } = res;
          id = data.id;
          token = data.token;
          newValues = {};

          for (let key in otherFields) {
            newValues[key] = randomString();
          }
          return userApi.update(id, token, newValues);
        })
        .then(res => expect(res.status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then(res => {
          expect(res).toBeDefined();
          const { status, data } = res;
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({
            ...newValues,
            username,
            id,
          });
        });
    });

    it('should update as null current empty fields', () => {
      let id, token, newValues2;

      return userApi
        .create(username, password, {
          ...otherFields,
        })
        .then(() => userApi.auth(username, password))
        .then(res => {
          const { data } = res;
          id = data.id;
          token = data.token;
          newValues2 = {};

          for (let key in otherFields)
            Math.random() < 0.5 ? (otherFields[key] = null) : (newValues2[key] = otherFields[key]);

          return userApi.update(id, token, otherFields);
        })
        .then(res => expect(res.status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then(res => {
          expect(res).toBeDefined();
          const { status, data } = res;
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({
            ...newValues2,
            username,
            id,
          });
        });
    });

    it('should write new fields when correct id and token passed', () => {
      let id, token;
      return userApi
        .create(username, password, {
          ...otherFields,
        })
        .then(() => userApi.auth(username, password))
        .then(res => {
          const { data } = res;
          id = data.id;
          token = data.token;

          const newFieldsLength = Math.random() * (10 - 1) + 1;

          for (let i = 0; i < newFieldsLength; i++) otherFields[randomString()] = randomString();

          return userApi.update(id, token, otherFields);
        })
        .then(res => expect(res.status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then(res => {
          expect(res).toBeDefined();
          expect(res.status).toBe('OK');
          expect(res.data).toBeDefined();
          expect(res.data).toEqual({
            ...otherFields,
            username,
            id,
          });
        });
    });

    describe('fail param', () => {
      let id, token;

      beforeAll(() =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(() => userApi.auth(username, password))
          .then(res => {
            id = res.data.id;
            token = res.data.token;
          })
      );

      it('must return a promise', () =>
        expect(userApi.update(id, token, {}) instanceof Promise).toBeTruthy());

      it('fails if no id', () => {
        expect(() =>
          userApi
            .update(undefined, token, {})
            .toThrowError(new RequirementError(`id is not optional`))
        );
      });

      it('fails if id is blank', () =>
        expect(() => userApi.update('  \t\n', token, {})).toThrowError(Error(`id is empty`)));

      it('fails if no token', () =>
        expect(() => userApi.update(id, undefined, {})).toThrowError(
          new RequirementError(`token is not optional`)
        ));

      it('fails if token is blank', () => {
        expect(() => userApi.update(id, '  \t\n', {}).toThrowError(Error(`id is empty`)));
      });

      it('fails if extra data is not an object', () =>
        expect(() => userApi.update(id, token, 1)).toThrowError(
          TypeError(`data 1 is not a object`)
        ));
    });
  });

  describe('updateAndCheckDeleted', () => {
    let username, password, otherFields;
    let id, token;
    let user;

    function randomChange() {
      const newUser = {
        ...user,
      };

      for (let key in newUser) {
        if (key !== 'password' && key !== 'username') {
          const action = Math.floor(Math.random() * 3);
          switch (action) {
            case 0: // change value
              user[key] = randomString();
              break;
            case 1: // new key and this key is unchanged
              user[randomString()] = randomString();
              break;
            case 2: // delete key
              delete user[key];
              break;
          }
        }
      }
      return newUser;
    }

    beforeEach(() => {
      username = randomString();
      password = randomString();
      otherFields = {};
      for (let ii = 0, ll = Math.floor(Math.random() * 30); ii < ll; ii++) {
        otherFields[randomString()] = randomString();
      }
      return userApi
        .create(username, password, {
          ...otherFields,
        })
        .then(() => userApi.auth(username, password))
        .then(({ data }) => {
          id = data.id;
          token = data.token;
          return userApi.retrieve(id, token);
        })
        .then(({ data }) => (user = data));
    });

    it('should persist a true copy of object even in deleted fields', () => {
      const newUser = randomChange(user);
      return userApi
        .updateAndCheckDeleted(id, token, newUser)
        .then(({ status }) => expect(status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then(({ data: retrievedUser }) => {
          expect(retrievedUser).toEqual(newUser);
        });
    });

    describe('fail param', () => {
      let id, token, user;

      beforeAll(() =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(() => userApi.auth(username, password))
          .then(res => {
            id = res.data.id;
            token = res.data.token;
          })
          .then(() => userApi.retrieve(id, token))
          .then(res => (user = res.data))
      );

      it('must return a promise', () =>
        expect(userApi.updateAndCheckDeleted(id, token, user) instanceof Promise).toBeTruthy());

      it('fails if no id', () =>
        expect(() => userApi.updateAndCheckDeleted(undefined, token, user)).toThrowError(
          new RequirementError(`id is not optional`)
        ));

      it('fails if token is blank', () => {
        expect(() =>
          userApi.updateAndCheckDeleted(id, '  \t\n', user).toThrowError(Error(`id is empty`))
        );
      });

      it('fails if no token', () =>
        expect(() => userApi.updateAndCheckDeleted(id, undefined, user)).toThrowError(
          new RequirementError(`token is not optional`)
        ));

      it('fails if user is not an object', () =>
        expect(() => userApi.updateAndCheckDeleted(username, password, 1)).toThrowError(
          TypeError(`user 1 is not a object`)
        ));

      it('fails if no/null id in username', () =>
        expect(() =>
          userApi.updateAndCheckDeleted(id, token, {
            user,
            id: null,
          })
        ).toThrow(new RequirementError(`user.id is not optional`)));
    });
  });

  describe('delete', () => {
    let username, password, otherFields;

    beforeEach(() => {
      username = randomString();
      password = randomString();
    });

    it('should retrieve on correct user data', () => {
      let id, token;
      return userApi
        .create(username, password)
        .then(() => userApi.auth(username, password))
        .then(res => {
          const { data } = res;
          id = data.id;
          token = data.token;
        })
        .then(() => userApi.delete(id, token, username, password))
        .then(({ status }) => expect(status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then(({ status, error }) => {
          expect(status).toBe('KO');
          expect(error).toBe(`user with id "${id}" does not exist`);
        })
        .then(() => userApi.auth(username, password))
        .then(({ status, error }) => {
          expect(status).toBe('KO');
          expect(error).toBe(`user with username "${username}" does not exist`);
        });
    });

    describe('fail param', () => {
      let id, token;

      beforeAll(() =>
        userApi
          .create(username, password, {
            ...otherFields,
          })
          .then(() => userApi.auth(username, password))
          .then(res => {
            id = res.data.id;
            token = res.data.token;
          })
      );

      it('must return a promise', () =>
        expect(userApi.delete(id, token, username, password) instanceof Promise).toBeTruthy());

      it('fails if no id', () =>
        expect(() => userApi.delete(undefined, token, username, password)).toThrowError(
          new RequirementError(`id is not optional`)
        ));

      it('fails if blank id', () =>
        expect(() => userApi.delete('  \t\n', token, username, password)).toThrowError(
          new RequirementError(`id is empty`)
        ));

      it('fails if no token', () =>
        expect(() => userApi.delete(id, undefined, username, password)).toThrowError(
          new RequirementError(`token is not optional`)
        ));

      it('fails if blank token', () =>
        expect(() => userApi.delete(id, '  \t\n', username, password)).toThrowError(
          new RequirementError(`token is empty`)
        ));
      it('fails if no username', () =>
        expect(() => userApi.delete(id, token, undefined, password)).toThrowError(
          new RequirementError(`username is not optional`)
        ));

      it('fails if blank username', () =>
        expect(() => userApi.delete(id, token, '  \t\n', password)).toThrowError(
          new RequirementError(`username is empty`)
        ));

      it('fails if no password', () =>
        expect(() => userApi.delete(id, token, username, undefined)).toThrowError(
          new RequirementError(`password is not optional`)
        ));

      it('fails if blank password', () =>
        expect(() => userApi.delete(id, token, username, '  \t\n')).toThrowError(
          new RequirementError(`password is empty`)
        ));
    });
  });
});
