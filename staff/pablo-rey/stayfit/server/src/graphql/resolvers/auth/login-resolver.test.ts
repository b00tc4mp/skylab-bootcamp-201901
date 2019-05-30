import { gql } from 'apollo-server';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { fillDbRandomUsers, userAndPlainPassword } from '../../../common/test-utils';
import { UserModel } from '../../../models/user';
import { random } from '../../../utils/random';
import { expectError } from '../../../utils/testing-utils/error-handling';
import { gCall } from '../../../utils/testing-utils/gqlCall';
import * as faker from 'faker';
import sinon = require('sinon');

chai.use(chaiAsPromised);
const { expect } = chai;

dotenv.config();
const {
  env: { MONGODB_URL_TESTING },
} = process;

describe('login user', function() {
  before(() => mongoose.connect(MONGODB_URL_TESTING!, { useNewUrlParser: true }));
  after(async () => await mongoose.disconnect());
  this.timeout(5000);

  const loginMutation = gql`
    mutation Login($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        accessToken
        refreshToken
      }
    }
  `;

  let users: userAndPlainPassword[];
  let email: string, password: string;
  let _user: userAndPlainPassword;

  beforeEach(async () => {
    await UserModel.deleteMany({});
    users = [];
    await fillDbRandomUsers(users);
    _user = random(users);
    email = _user.user.email;
    password = _user.password!;
  });

  it.only('should login correct a random user', async () => {
    const fakeCookie = sinon.fake();
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password,
      },
      ctx: {
        res: { cookie: fakeCookie },
      },
    });
    if (response.errors) console.log(response.errors);
    expect(response).not.to.have.property('errors');
    expect(response).to.have.property('data');
    const { login } = response.data as any;
    expect(login).not.to.be.undefined;
    const { accessToken, refreshToken } = login;
    expect(fakeCookie.calledWithMatch('refresh-token', refreshToken)).to.be.true;
    expect(fakeCookie.calledWithMatch('access-token', accessToken)).to.be.true;
    const decodedAccessToken = await jwt.decode(accessToken);
    expect(decodedAccessToken)
      .to.have.property('sub')
      .to.be.equal(_user.user.id);

    const now = new Date().getTime() / 1000;
    expect(decodedAccessToken).to.have.property('iat');
    // .to.be.closeTo(now, 20);
    const exp = now + 60 * 60; // 60 minutes
    expect(decodedAccessToken).to.have.property('exp');
    // .to.be.closeTo(exp, 20);
  });

  it('should fail if email does not exists', async () => {
    await UserModel.findByIdAndDelete(_user.user.id);
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        email,
        password,
      },
    });
    expectError(response, 'AuthenticationError', 'wrong credentials');
  });

  describe('params bad format', () => {
    it('should fail if email is empty', async () => {
      const response = await gCall({
        source: loginMutation,
        variableValues: {
          email: '',
          password,
        },
      });
      expectError(response, 'Error', 'Argument Validation Error');
    });
    it('should fail if email provided is not a valid formated email', async () => {
      const response = await gCall({
        source: loginMutation,
        variableValues: {
          email: faker.random.alphaNumeric(),
          password,
        },
      });
      expectError(response, 'Error', 'Argument Validation Error');
    });

    it('should fail if password is empty', async () => {
      const response = await gCall({
        source: loginMutation,
        variableValues: {
          email,
          password: '',
        },
      });
      expectError(response, 'Error', 'Argument Validation Error');
    });
  });
});
