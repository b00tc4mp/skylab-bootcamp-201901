import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as uuid from 'uuid/v4';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as bcrypt from 'bcryptjs';

import usersLogic from './users';
import { User } from '../models/User';

import { ValidationError } from './errors'

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
    await User.deleteMany({});
  });

  describe.only('create users', () => {
    let name: string, surname: string, email: string, password: string;

    beforeEach(() => {
      name = `name-${uuid()}`;
      surname = `surname-${uuid()}`;
      email = `email-${uuid()}@testing.com`;
      password = `password-${uuid()}`;
    });

    it('should register an user with correct data', async () => {
      const user = await usersLogic.create(name, surname, email, password);
      expect(user).not.to.be.undefined;
      expect(user)
        .to.have.property('name')
        .equal(name);
      expect(user)
        .to.have.property('surname')
        .equal(surname);
      expect(user)
        .to.have.property('email')
        .equal(email);
      expect(user).not.to.have.property('password');

      const _users = await User.find();
      expect(_users).to.have.lengthOf(1);

      const _user = _users[0];
      expect(_user)
        .to.have.property('name')
        .equal(name);
      expect(_user)
        .to.have.property('surname')
        .equal(surname);
      expect(_user)
        .to.have.property('email')
        .equal(email);
      expect(_user).to.have.property('password');
      expect(await bcrypt.compare(password, _user.password)).to.be.true;
    });

    describe('logic fail registration', () => {
      it('should fail to register an user with same email', async () => {
        await User.create({ name, surname, email, password })
        expect(usersLogic.create(name, surname, email, password)).to.be.rejectedWith(ValidationError, 'email already registered');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(1);
      });
    });

    describe('fail registration if fields are blank or empty', () => {
      it('should fail if name is empty', async () => {
        expect(usersLogic.create('', surname, email, password)).to.be.rejectedWith(ValidationError, 'name is required');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if surname is empty', async () => {
        expect(usersLogic.create(name, '', email, password)).to.be.rejectedWith(ValidationError, 'name is required');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if email is empty', async () => {
        expect(usersLogic.create(name, surname, '', password)).to.be.rejectedWith(ValidationError, 'email is required');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if email provided is not a valid formated email', async () => {
        expect(usersLogic.create(name, surname, uuid(), password)).to.be.rejectedWith(ValidationError, 'email not contains a valid email');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(0);
      });
      it('should fail if password is empty', async () => {
        expect(usersLogic.create(name, surname, email, '')).to.be.rejectedWith(ValidationError, 'password is required');
        const _users = await User.find({email});
        expect(_users).to.have.lengthOf(0);
      });
    });
  });
});
