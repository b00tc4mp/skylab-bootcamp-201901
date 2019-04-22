"use strict";

describe("user api", () => {
  const name = "Lila";
  const surname = "Petri";
  let username;
  const password = "123";

  beforeEach(done => {
    username = `marialilapetri-${Math.random()}@gmail.com`;
    done();
  });

  describe("create", () => {
    it("should succeed on correct user data", done => {
      userApi.create(name, surname, username, password, function(response) {
        expect(response).toBeDefined();

        const {status,data: { id }} = response;

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

    // TODO password fail cases
  });

  describe("authenticate", () => {
    const name = "Lila";
    const surname = "Petri";
    let username;
    const password = "123";

    beforeEach(done => {
      username = `marialilapetri-${Math.random()}@gmail.com`;
      userApi.create(name, surname, username, password, done);
    });

    it("should succeed on correct user data", done => {
      userApi.authenticate(username, password, (response)=> {
        expect(response).toBeDefined();
        const {
          status,
          data: { id, token }
        } = response;
        expect(status).toBe("OK");
        expect(typeof id).toBe("string");
        expect(id.length).toBeGreaterThan(0);
        expect(typeof token).toBe("string");
        expect(token.length).toBeGreaterThan(0);

        done();
      });
    });

   it('should return differet tokens on differents request', done=>{
        userApi.authenticate(username, password, (responseOne)=>{
            setTimeout(function(){
                userApi.authenticate(username, password, function(responseSecond){
                    expect(responseOne.data.token).not.toBe(responseSecond.data.token)
                    expect(responseOne.data.id).toBe(responseSecond.data.id)
                    done();
                })
            }, 1500);
        })
    })

    it("should fail on undefined username", () => {
      const username = undefined;

      expect(() =>
        userApi.authenticate(username, password, () => {})
      ).toThrowError(RequirementError, `username is not optional`);
    })

    it("should fail on null username", () => {
      const username = null;

      expect(() =>
        userApi.authenticate(username, password, () => {})
      ).toThrowError(RequirementError, `username is not optional`);
    })

    it("should fail on not registered user", done => {
        const username = `random-${Math.random()}@gmail.com`;
        userApi.authenticate(username, password, function(response) {
          expect(response).toBeDefined();
          const { status, error } = response;
          expect(status).toBe("KO");
          expect(error).toBe(
            `user with username \"${username}\" does not exist`
          );
          done();
        });
      })
    it("should fail on incorrect password", done => {
    const password = '1234'
    userApi.authenticate(username, password, function(response) {
        expect(response).toBeDefined();
        const { status, error } = response;
        expect(status).toBe("KO")
        expect(error).toBe(`username and/or password wrong`)
        done()
    })
    })

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
  describe("retrieve", () => {
      let id
      let token
    beforeEach( done => {
        userApi.create(name, surname, username, password, ()=>{
            userApi.authenticate(username, password, response =>{
                    id=response.data.id
                    token=response.data.token
                    done()
            })
        })
    })
    it('should succeed on retrieve user data', done =>{
        userApi.retrieve(id, token, response=>{
          
          expect(response).toBeDefined();
          const {status,data: { name, surname, username, id }} = response;
          expect(status).toBe('OK')
          expect(typeof name).toBe("string");
          expect(name.length).toBeGreaterThan(0);
          expect(name).toBe(name)
          expect(typeof surname).toBe("string");
          expect(surname.length).toBeGreaterThan(0);
          expect(surname).toBe(surname)
          expect(typeof username).toBe("string");
          expect(username.length).toBeGreaterThan(0);
          expect(username).toBe(username)
          expect(typeof id).toBe("string");
          expect(id.length).toBeGreaterThan(0);
          expect(id).toBe(id)

            done()
        })
    })

    it('should fail if the token is incorrect', done =>{
      const token='123'
      userApi.retrieve(id, token, response=>{
        
        expect(response).toBeDefined();
        const {status,error} = response;
        expect(status).toBe('KO')
        expect(error).toBe('invalid token')

        done()
      })
    })

    it('should fail if the id is incorrect', done =>{
      const id='123'
      userApi.retrieve(id, token, response=>{
        
        expect(response).toBeDefined();
        const {status,error} = response;
        expect(status).toBe('KO')

        done()
      })
    })
    it('should fail on undefined id', ()=>{

      const id = undefined;

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(RequirementError, `id is not optional`);
    })
    it('should fail on null id', ()=>{

      const id = null;

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(RequirementError, `id is not optional`);
    })
    it('should fail on empty id', ()=>{

      const id = "";

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(ValueError, `id is empty`);
    })
    it('should fail on blank id', ()=>{

      const id = " \t    \n";

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(ValueError, `id is empty`);
    })
    it('should fail on undefined token', ()=>{
      const token = undefined;

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(RequirementError, `token is not optional`);
    })
    it('should fail on null token', ()=>{

      const token = null;

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(RequirementError, `token is not optional`);
    })
    it('should fail on empty token', ()=>{

      const token = "";

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(ValueError, `token is empty`);
    })
    it('should fail on blank token', ()=>{

      const token = " \t    \n";

      expect(() =>
        userApi.retrieve(id, token, () => {})
      ).toThrowError(ValueError, `token is empty`);
    })   
  })
  describe("update", () => {
    // blah blah blah
  })
})
