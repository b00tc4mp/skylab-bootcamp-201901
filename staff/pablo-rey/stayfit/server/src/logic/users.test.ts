import { LogicError } from './errors/index';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as uuid from 'uuid/v4';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as bcrypt from 'bcryptjs';

import { random } from '../utils/random';

import usersLogic from './users';
import { UserModel } from '../models/user';

import { ValidationError } from './errors';
import { ObjectId } from 'bson';
import users from './users';

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('users', () => {
  let db: mongoose.Connection;

  before(done => {
    mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true });
    db = mongoose.connection;
    db.on('error', err => console.error('MongoDB connection error', err));
    db.on('open', () => done());
  });
  after(() => mongoose.disconnect());

  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  const userExpectations = (user: any): void => {
    expect(user).not.to.be.undefined;
    expect(user)
      .to.have.property('id')
      .and.be.instanceOf(ObjectId);
    expect(user)
      .to.have.property('name')
      .and.be.a('string');
    expect(user)
      .to.have.property('surname')
      .and.be.a('string');
    expect(user)
      .to.have.property('email')
      .and.be.a('string');
    expect(user).not.to.have.property('password');
  };

  describe('create users', () => {
    let name: string, surname: string, email: string, password: string;

    beforeEach(() => {
      name = `name-${uuid()}`;
      surname = `surname-${uuid()}`;
      email = `email-${uuid()}@testing.com`;
      password = `password-${uuid()}`;
    });

    it('should register an user with correct data', async () => {
      const user = await usersLogic.create(name, surname, email, password);
      userExpectations(user);
      expect(user.name).to.be.equal(name);
      expect(user.surname).to.be.equal(surname);
      expect(user.email).to.be.equal(email);

      const _users = await UserModel.find();
      expect(_users).to.have.lengthOf(1);

      const _user = _users[0];
      expect(_user)
        .to.have.property('name')
        .and.be.equal(name);
      expect(_user)
        .to.have.property('surname')
        .and.be.equal(surname);
      expect(_user)
        .to.have.property('email')
        .and.be.equal(email);
      expect(_user).to.have.property('password');
      expect(await bcrypt.compare(password, _user.password)).to.be.true;
    });

    describe('logic fail registration', () => {
      it('should fail to register an user with same email', async () => {
        await UserModel.create({ name, surname, email, password });
        expect(usersLogic.create(name, surname, email, password)).to.be.rejectedWith(
          ValidationError,
          'email already registered'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(1);
      });
    });

    describe('fail registration if fields are blank or empty', () => {
      it('should fail if name is empty', async () => {
        expect(usersLogic.create('', surname, email, password)).to.be.rejectedWith(
          ValidationError,
          'name is required'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if surname is empty', async () => {
        expect(usersLogic.create(name, '', email, password)).to.be.rejectedWith(
          ValidationError,
          'name is required'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if email is empty', async () => {
        expect(usersLogic.create(name, surname, '', password)).to.be.rejectedWith(
          ValidationError,
          'email is required'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if email provided is not a valid formated email', async () => {
        expect(usersLogic.create(name, surname, uuid(), password)).to.be.rejectedWith(
          ValidationError,
          'email not contains a valid email'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if password is empty', async () => {
        expect(await usersLogic.create(name, surname, email, '')).to.be.rejectedWith(
          ValidationError,
          'password is required'
        );
        const _users = await UserModel.find({ email });
        expect(_users).to.have.lengthOf(0);
      });
    });
  });

  describe('retrieve user', function ()  {
    const users: any = [];

    this.timeout(5000);

    beforeEach(async () => {
      for (let ii = 0, ll = random(15); ii < ll; ii++) {
        const name = `name-${uuid()}`;
        const surname = `surname-${uuid()}`;
        const email = `email-${uuid()}@testing.com`;
        const password = `password-${uuid()}`;
        const hashPassword = await bcrypt.hash(password, 12);
        users.push(await UserModel.create({ name, surname, email, password: hashPassword }));
      }
    });

    it('should retrieve a random user', async () => {
      const _user = random(users);
      const user = await usersLogic.retrieve(_user.id);
      expect(user).not.to.be.null;
      userExpectations(user);
      expect(user.name).to.be.equal(_user.name);
      expect(user.surname).to.be.equal(_user.surname);
      expect(user.email).to.be.equal(_user.email);
    });

    it('should fail if id is wrong', async () => {
      const _user = random(users);
      await UserModel.findByIdAndDelete(_user.id);
      expect(await usersLogic.retrieve(_user.id)).to.be.rejectedWith(
        LogicError,
        'id not found'
      );
    });

    describe('params bad format', () => {
      it('should fail if is not a correct ObjectId string', async () => {
        expect(await usersLogic.retrieve(uuid())).to.be.rejectedWith(ValidationError, 'id is not correct');
      });
    });
  });

  describe('retrieve all users', function ()  {
    const users: any = [];

    this.timeout(5000);

    beforeEach(async () => {
      for (let ii = 0, ll = random(15) + 1 ; ii < ll; ii++) {
        const name = `name-${uuid()}`;
        const surname = `surname-${uuid()}`;
        const email = `email-${uuid()}@testing.com`;
        const password = `password-${uuid()}`;
        const hashPassword = await bcrypt.hash(password, 12);
        users.push(await UserModel.create({ name, surname, email, password: hashPassword }));
      }
    });

    it('should retrieve a random user', async () => {
      const _users = await usersLogic.retrieveAll();
      expect(_users).not.to.be.null;
      expect(_users).to.have.lengthOf(users.length);

      _users.map(_user => {
        userExpectations(_user)
        const user:any = users.find((user:any) => user.id.toString() === _user.id.toString());
        expect(user).not.to.be.undefined;
        expect(_user.name).to.be.equal(user.name);
        expect(_user.surname).to.be.equal(user.surname);
        expect(_user.email).to.be.equal(user.email);
      });
    });
  })
});
