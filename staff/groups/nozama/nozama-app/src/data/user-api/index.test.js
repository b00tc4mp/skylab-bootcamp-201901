import userApi from ".";
import { RequirementError } from '../../common/errors';

const randomString = (length = 20) => Number(Math.random() * 9 ** length).toString(35);


describe ("user-api", () => {
  describe("create", () => {
    const name = "test";
    const surname = "test";
    let username;
    const password = randomString();
    const otherFields = {};
    
    beforeEach(() => username = randomString());

    describe("create & not duplicate", () => {
      beforeEach(() => {
        for (let ii=0, ll=Math.floor(Math.random()*10); ii < ll; ii++) {
          otherFields[randomString()] = randomString(); 
        }
      })
    
      it("should succeed on correct user data", () => 
        userApi.create(username, password, {...otherFields})
          .then((res) => {
            expect(res).toBeDefined();
            expect(res.status).toBe('OK'); 
            expect(res.data).toBeDefined();
            const { data } = res;
            expect(data.id).toBeDefined();
            expect(typeof data.id).toBe("string");
          })
      );

      it("should fail on same username", () => 
        userApi.create(username, password, {...otherFields})
          .then(() => userApi.create(username, password, {...otherFields}))
          .then((res) => {
            expect(res).toBeDefined();
            expect(res.status).toBe('KO');
            expect(res.error).toBeDefined(); 
            const { error } = res;
            expect(error).toBe(`user with username "${username}" already exists`);
        })
      );  
    });

    describe("fail param", () => {
      it("must return a promise", () => 
        expect(userApi.create(username, password, {}) instanceof Promise).toBeTruthy()
      );

      it("fails if no username", () => 
        expect(() => userApi.create(undefined, password, {}))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no password", () => 
        expect(() => userApi.create(username, undefined, {}))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if extra data is not an object", () => 
        expect(() => userApi.create(username, password, 1))
          .toThrowError(TypeError, `undefined is not optional`)
      );
    })
  });

  describe("auth", () => {
    let username, password, _id;
        
    beforeEach(() => {
      username = randomString();
      password = randomString();
    });

    it("should succeed on correct user data", () =>  
      userApi.create(username, password, {})
        .then((res) => {
          expect(res).toBeDefined();
          expect(res.status).toBe('OK'); 
          expect(res.data).toBeDefined();
          const { data } = res;
          _id = data.id;
        })
        .then (() => userApi.auth(username, password))
        .then((res) => {
          expect(res).toBeDefined();
          expect(res.status).toBe('OK');
          expect(res.data).toBeDefined();
          const { data: { id, token }} = res;
          expect(id).toBe(_id);
          expect(typeof token).toBe('string');
        })
    );

    describe ("should fail on wrong data", () => {
      const wrongParam = randomString();
    
      beforeEach(() => userApi.create(username, password));

      it("should fail on wrong username", () =>  
        userApi.auth(wrongParam, password)
          .then((res) => {
            expect(res).toBeDefined();
            expect(res.status).toBe('KO');
            const { error } = res;
            expect(error).toBe(`user with username "${wrongParam}" does not exist`);
          })
      );

      it("should fail on wrong username", () => 
        userApi.auth(username, wrongParam)
          .then((res) => {
            expect(res).toBeDefined();
            expect(res.status).toBe('KO');
            const { error } = res;
            expect(error).toBe(`username and/or password wrong`);
          })
      );

    });

    describe("fail param", () => {
      it("must return a promise", () => 
        expect(userApi.auth(username, password, {}) instanceof Promise).toBeTruthy()
      );

      it("fails if no username", () => 
        expect(() => userApi.auth(undefined, password, {}))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no password", () => 
        expect(() => userApi.auth(username, undefined, {}))
          .toThrowError(RequirementError, `undefined is not optional`)
      );
    })
  });

  describe('retrieve', () => {
    let username, password, otherFields;
    
    beforeEach(() => {
      username = randomString();
      password = randomString();
      otherFields = {};
      for (let ii=0, ll=Math.floor(Math.random()*10); ii < ll; ii++) {
        otherFields[randomString()] = randomString(); 
      }
    });
    
    it("should retrieve on correct user data", () => { 
      let id, token;
      return userApi.create(username, password, {...otherFields})
        .then(() => userApi.auth(username, password))
        .then((res) => {
          const { data } = res;
          id = data.id;
          token = data.token
        })
        .then(() => userApi.retrieve(id, token))
        .then((res) => {
          expect(res).toBeDefined();
          const { status, data } = res
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({...otherFields, username, id, app: 'nozama'});
        });
    });

    describe("fail param", () => {
      let id, token;

      beforeAll(() => 
        userApi.create(username, password, {...otherFields})
         .then(() => userApi.auth(username, password))
         .then((res) => {
           id = res.data.id;
           token = res.data.token;
         })
      )

      it("must return a promise", () => 
        expect(userApi.retrieve(id, token) instanceof Promise).toBeTruthy()
      );

      it("fails if no id", () => 
        expect(() => userApi.retrieve(undefined, token))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no token", () => 
        expect(() => userApi.retrieve(id, undefined))
          .toThrowError(RequirementError, `undefined is not optional`)
      );
    })

  })

  describe('update', () => {
    let username, password, otherFields;
    
    beforeEach(() => {
      username = randomString();
      password = randomString();
      otherFields = {};
      for (let ii=0, ll=Math.floor(Math.random()*10); ii < ll; ii++) {
        otherFields[randomString()] = randomString(); 
      }
    });
    
    it("should update on correct id and token", () => { 
      let id, token, newValues;

      return userApi.create(username, password, {...otherFields})
        .then(() => userApi.auth(username, password))
        .then((res) => {
          const { data } = res;
          id = data.id;
          token = data.token
          newValues = {}

          for(let key in otherFields){

              newValues[key] = randomString()
          }
          return userApi.update(id, token, newValues)            
        })
        .then((res)=>  expect(res.status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then((res) => {
          expect(res).toBeDefined();
          const { status, data } = res
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({...newValues, username, id, app: 'nozama'});
        });
    });
    
    it("should update as null current empty fields", () => { 
      let id, token, newValues2;

      return userApi.create(username, password, {...otherFields})
        .then(() => userApi.auth(username, password))
        .then((res) => {
          const { data } = res;
          id = data.id;
          token = data.token
          newValues2 = {}
          

          for(let key in otherFields)
                Math.random() < 0.5 ? otherFields[key] = null : newValues2[key] = otherFields[key] 
            
          return userApi.update(id, token, otherFields)            
        })
        .then((res)=>  expect(res.status).toBe('OK'))
        .then(() => userApi.retrieve(id, token))
        .then((res) => {
          expect(res).toBeDefined();
          const { status, data } = res
          expect(status).toBe('OK');
          expect(data.password).toBeUndefined();
          expect(data).toEqual({...newValues2, username, id, app: 'nozama'});
        });
    });

    describe("fail param", () => {
      let id, token;

      beforeAll(() => 
        userApi.create(username, password, {...otherFields})
         .then(() => userApi.auth(username, password))
         .then((res) => {
           id = res.data.id;
           token = res.data.token;
         })
      )

      it("must return a promise", () => 
        expect(userApi.retrieve(id, token) instanceof Promise).toBeTruthy()
      );

      it("fails if no id", () => 
        expect(() => userApi.retrieve(undefined, token))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no token", () => 
        expect(() => userApi.retrieve(id, undefined))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if extra data is not an object", () => 
      expect(() => userApi.create(username, password, 1))
        .toThrowError(TypeError, `undefined is not optional`)
      );
    })
  });

  describe('updateAndCheckDeleted', () => {
    let username, password, otherFields;
    let id, token;
    let user;
  
    function randomChange() {
      const newUser = {...user};
        
      for (let key in newUser) {
        if (key !== 'password' && key !== 'username') {
          const action = Math.floor(Math.random() * 3)
          switch (action) {
            case 0: // change value
              user[key] = randomString();
              break;
            case 1: // new key and this key is unchanged
              user[randomString()] = randomString()
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
      for (let ii=0, ll=Math.floor(Math.random()*30); ii < ll; ii++) {
        otherFields[randomString()] = randomString(); 
      }
      return userApi.create(username, password, { ...otherFields })
        .then(() => userApi.auth(username, password))
        .then(({ data }) => {
          id = data.id;
          token = data.token;
          return userApi.retrieve(id, token)
        })
        .then(({ data }) => user = data)
    });
    
    it("should persist a true copy of object even in deleted fields", () => { 
      const newUser = randomChange(user);
      return userApi.updateAndCheckDeleted(id, token, newUser)
        .then (({ status }) => expect(status).toBe('OK'))
        .then (() => userApi.retrieve(id, token))
        .then (({data: retrievedUser}) => {
          expect(retrievedUser).toEqual(newUser);
        })
    });

    describe("fail param", () => {
      let id, token;

      beforeAll(() => 
        userApi.create(username, password, {...otherFields})
         .then(() => userApi.auth(username, password))
         .then((res) => {
           id = res.data.id;
           token = res.data.token;
         })
      )

      it("must return a promise", () => 
        expect(userApi.retrieve(id, token) instanceof Promise).toBeTruthy()
      );

      it("fails if no id", () => 
        expect(() => userApi.retrieve(undefined, token))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no token", () => 
        expect(() => userApi.retrieve(id, undefined))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if extra data is not an object", () => 
      expect(() => userApi.create(username, password, 1))
        .toThrowError(TypeError, `undefined is not optional`)
      );
    })

  });

  describe('delete', () => {
    let username, password, otherFields;
    
    beforeEach(() => {
      username = randomString();
      password = randomString();
    });
    
    it("should retrieve on correct user data", () => { 
      let id, token;
      return userApi.create(username, password)
        .then(() => userApi.auth(username, password))
        .then((res) => {
          const { data } = res;
          id = data.id;
          token = data.token
        })
        .then(() => userApi.delete(id, token, username, password))
        .then(({ status }) => expect(status).toBe('OK'))          
        .then(() => userApi.retrieve(id, token))
        .then(({status, error}) => {
          expect(status).toBe('KO');
          expect(error).toBe(`user with id "${id}" does not exist`)
        })
        .then(() => userApi.auth(username, password))
        .then(({status, error}) => {
          expect(status).toBe('KO');
          expect(error).toBe(`user with username "${username}" does not exist`)
        });
    });

    describe("fail param", () => {
      let id, token;

      beforeAll(() => 
        userApi.create(username, password, {...otherFields})
         .then(() => userApi.auth(username, password))
         .then((res) => {
           id = res.data.id;
           token = res.data.token;
         })
      )

      it("must return a promise", () => 
        expect(userApi.retrieve(id, token) instanceof Promise).toBeTruthy()
      );

      it("fails if no id", () => 
        expect(() => userApi.retrieve(undefined, token))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no token", () => 
        expect(() => userApi.retrieve(id, undefined))
          .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no username", () => 
      expect(() => userApi.auth(undefined, password, {}))
        .toThrowError(RequirementError, `undefined is not optional`)
      );

      it("fails if no password", () => 
        expect(() => userApi.auth(username, undefined, {}))
          .toThrowError(RequirementError, `undefined is not optional`)
      );
    })
  })
});