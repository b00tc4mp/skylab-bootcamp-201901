require('dotenv').config()
const { mongoose, models: { User, Product } } = require("pro-skate-data");
const {
  errors: {
  LogicError,
  RequirementError,
  ValueError,
  FormatError,
  UnauthorizedError
  }
} = require("pro-skate-common");
const chai = require("chai");
const { expect } = chai;
const dataApi = require(".");
const argon2 = require("argon2");

const {
  env: { MONGO_URL_LOGIC_TEST: url }
} = process;

describe("data-api", () => {
  let name, surname, email, imageUrl, _password, age

  before(() => mongoose.connect(url, { useNewUrlParser: true }));
  after(async () => mongoose.disconnect());

  beforeEach(async () => {
    await User.deleteMany();
    name = `name-${Math.random()}`;
    surname = `surname-${Math.random()}`;
    email = `email-${Math.random()}@mail.com`;
    imageUrl = `http://-${Math.random()}@mail.com`;
    _password = `password-${Math.random()}`;
    age = `${Math.floor(Math.random() * 100)}`;
  });

  describe("user test", () => {

    describe("create user", async ()=> {
      beforeEach( async ()=> {
        User.deleteMany()

      })

      it("should succeed on correct data", async function() {

        const res = await dataApi.createUser(name, surname, email, _password, age, imageUrl );
        const { message } = res
        expect(message).to.equal('Ok, user registered.');

        const users = await User.find();

        expect(users).to.exist;
        expect(users).to.have.lengthOf(1);
        const [user] = users;

        expect(user.name).to.equal(name);
        expect(user.surname).to.equal(surname);
        expect(user.email).to.equal(email);
        expect(user.imageUrl).to.equal(imageUrl);
        expect(user.password).to.exist;
        expect(user.age).to.equal(parseInt(age));
        expect(user.cart).to.be.an("array");
        expect(user.wishlist).to.be.an("array");
        expect(user.historic).to.be.an("array");
        expect(await argon2.verify(user.password, _password)).to.be.true;
      });

      describe("on already existing user", () => {

        beforeEach(
          async () => {
            await User.create({ name, surname, email, password: _password, age, imageUrl}) 
        });

        it("should fail on retrying to register", async () => {
          try {
              await dataApi.createUser(name, surname, email, _password, age, imageUrl );
            throw Error("should not reach this point");
          } catch (error) {
            expect(error).not.to.be.undefined;
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(`user with email "${email}" already exists`);
          }
        });

      });

    });

  });

  describe("authenticate user", () => {
    beforeEach(async () => {
      const hash = await argon2.hash(_password);
      await User.create({ name, surname, email, imageUrl, password: hash, age });
    });

    it("should succeed on correct credentials", async () => {
      
      const token  = await dataApi.authenticate(email, _password);

      expect(token).to.exist;
      expect(token).to.be.a("string");

    });

    it("should fail on non-existing user", async () => {
      try {
        await dataApi.authenticate((email = "unexisting-user@mail.com"), _password);
        throw Error("should not reach this point");
      } catch (error) {
        expect(error).not.to.be.undefined;
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(`user with email "${email}" does not exist`);
      }
    });
  });

  describe("retrieve user", () => {
    let user, token

    beforeEach(async () => {
      user = await User.create({name, surname, email, password: await argon2.hash(_password), age})
      token  = await dataApi.authenticate(email, _password)
  });

    it("should succeed on correct id from existing user", async () => {
      
      const _user = await dataApi.retrieveUser(token);
      expect(_user.id).to.be.undefined;
      expect(_user.name).to.equal(name);
      expect(_user.surname).to.equal(surname);
      expect(_user.email).to.equal(email);
      expect(_user.age).to.equal(parseInt(age));
      expect(_user.password).to.be.undefined;
    });
  });

  describe("update user", () => {
    User.deleteMany()
    let user, _user, token
    
    beforeEach(async () => {
      name = `name-${Math.random()}`;
      surname = `surname-${Math.random()}`;
      email = `email-${Math.random()}@mail.com`;
      password = `password-${Math.random()}`;
      age = `${Math.floor(Math.random() * 100)}`;
      user = await User.create({
        name,
        surname,
        email,
        password: await argon2.hash(password),
        age
      });
      token = await dataApi.authenticate(email, password)
      

    });

    it("should succeed on update user correct id from existing user", async () => {
      const _name = `name-updated-${Math.random()}`;
      const _surname = `surname-${Math.random()}`;
      const _email = `email-${Math.random()}@mail.com`;
      const _age = `${Math.floor(Math.random() * 100)}`;

      debugger
      await dataApi.updateUser(token,   _name,  _surname,  _email, _age );
      debugger
      const _user_ = await User.findOne({ name: _name });

      
      expect(_user_.name).to.equal(_name);
      expect(_user_.surname).to.equal(_surname);
      expect(_user_.email).to.equal(_email);
      expect(_user_.age).to.equal(parseInt(_age));
    });

    it("should fail unexinting user", async () => {

      await User.findOneAndDelete(user.id);
      try {
        await dataApi.updateUser(token, { name, surname, email, age });
        throw Error("should not reach this point");
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal(`That user doesn't exist`);
      }
    });

  });

  describe("Delete User", () => {
    let token
    beforeEach(async () => {
      await User.create({ name, surname, email, password: await argon2.hash(_password), age });
      token = await dataApi.authenticate( email,  _password )

    });

    it.only("should delete user on correct token", async () => {
      await dataApi.deleteUser(token);

      const userDb = await User.findOne({ email });
      expect(userDb).to.be.null;
    });

    it("should fail on unexisting id", async () => {
      try {
        User.create({
          name,
          surname,
          email: "danbang@gmail.com",
          password: await argon2.hash(password),
          age
        });
        const userDb = User.findOne({ email });
        const deletedUserId = userDb.id;
        User.findByIdAndDelete(deletedUserId);
        logic.deleteUser(deletedUserId);
        throw Error("should not reach this point");
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equals('');
      }
    });

  });



  


});
